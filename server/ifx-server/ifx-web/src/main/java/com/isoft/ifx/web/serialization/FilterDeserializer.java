package com.isoft.ifx.web.serialization;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.isoft.ifx.core.filter.*;
import com.isoft.ifx.core.utils.EnumUtils;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.core.serializer.support.SerializationFailedException;

import java.io.IOException;
import java.util.List;

/**
 * Created by liuqiang03 on 2017/6/27.
 */

public class FilterDeserializer extends JsonDeserializer<Filter> {
    @Override
    public Filter deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        return deserialize(node, deserializationContext);
    }

    private Filter deserialize(JsonNode node, DeserializationContext deserializationContext) {
        Filter filter;

        if (node.get("connector") != null) {
            filter = deserializeComposedFilter(node, deserializationContext);
        } else if (node.get("property") != null) {
            filter = deserializeFilterItem(node, deserializationContext);
        } else {
            throw new SerializationFailedException("筛选器json格式错误，应该包含connector或者property属性, filter:" + node.asText());
        }

        return filter;
    }

    private Filter deserializeComposedFilter(JsonNode node, DeserializationContext deserializationContext) {
        Filter filter = null;
        Connector connector = EnumUtils.parseEnum(Connector.class, node.get("connector").longValue());

        JsonNode filtersNode = node.get("filters");
        JsonNode leftNode = node.get("left");
        JsonNode rightNode = node.get("right");

        if (filtersNode != null && filtersNode.isArray()) {

            List<JsonNode> nodes = node.findValues("filters");

            if (nodes.size() < 1) {
                throw new SerializationFailedException("筛选器包含filters属性，但filters中的元素个数应该大于1，filter:" + node.asText());
            }

            for (int i = 0; i < nodes.size(); i++) {
                Filter right = deserialize(nodes.get(i), deserializationContext);
                if (i == 0) {
                    filter = right;
                } else {
                    filter = new ComposedFilter(filter, right, connector);
                }
            }
        } else if (leftNode != null && rightNode != null) {
            Filter left = deserialize(leftNode, deserializationContext);
            Filter right = deserialize(rightNode, deserializationContext);

            filter = new ComposedFilter(left, right, connector);
        } else {
            throw new SerializationFailedException("筛选器包含connector属性，但是缺少left、right或者filters属性，filter:" + node.asText());
        }

        return filter;
    }

    private Filter deserializeFilterItem(JsonNode node, DeserializationContext deserializationContext) {
        Filter filter = null;

        JsonNode propertyNode = node.get("property");
        if (propertyNode == null) {
            throw new SerializationFailedException("筛选器property属性不能为空!");
        }

        JsonNode valueNode = node.get("value");
        if (valueNode == null) {
            throw new SerializationFailedException("筛选器value属性不能为空!");
        }

        JsonNode operatorNode = node.get("operator");
        if (operatorNode == null) {
            throw new SerializationFailedException("筛选器operator属性不能为空!");
        }

        JsonNode dataTypeNode = node.get("type");
        if (dataTypeNode == null) {
            throw new SerializationFailedException("筛选器type属性不能为空!");
        }

        DataType dataType = EnumUtils.parseEnum(DataType.class, dataTypeNode.longValue());
        String property = propertyNode.asText();
        long operator = operatorNode.longValue();

        switch (dataType) {
            case STRING:
                filter = new StringFilter(property
                        , valueNode.asText()
                        , EnumUtils.parseEnum(StringOperator.class, operator));
                break;
            case BOOLEAN:
                filter = new BooleanFilter(property
                        , valueNode.booleanValue()
                        , EnumUtils.parseEnum(BooleanOperator.class, operator));
                break;
            case NUMBER:
                filter = new NumberFilter(property
                        , valueNode.numberValue()
                        , EnumUtils.parseEnum(NumberOperator.class, operator));
                break;
            case DATE:
                filter = new DateFilter(property
                        , deserializationContext.parseDate(valueNode.asText())
                        , EnumUtils.parseEnum(DateOperator.class, operator));
                break;
        }

        return filter;
    }
}

