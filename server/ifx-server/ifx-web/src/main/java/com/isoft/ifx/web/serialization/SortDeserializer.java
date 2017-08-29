package com.isoft.ifx.web.serialization;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.isoft.ifx.core.utils.EnumUtils;
import org.springframework.boot.jackson.JsonComponent;
import org.springframework.core.serializer.support.SerializationFailedException;
import org.springframework.data.domain.Sort;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by liuqiang03 on 2017/6/27.
 */
public class SortDeserializer extends JsonDeserializer<Sort> {
    @Override
    public Sort deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        JsonNode node = jsonParser.getCodec().readTree(jsonParser);
        List<Sort.Order> orders = new ArrayList<>();

        if (node.isArray()) {
            for (int i = 0; i < node.size(); i++) {
                orders.add(parseNode(node.get(i)));
            }
        } else {
            throw new SerializationFailedException("排序器sort必须是数组,sort:" + node.asText());
        }

        return new Sort(orders);
    }

    public Sort.Order parseNode(JsonNode jsonNode) {
        JsonNode propertyNode = jsonNode.get("property");

        if (propertyNode == null) {
            throw new SerializationFailedException("排序器必须包含property属性, sort:" + jsonNode.asText());
        }

        JsonNode directionNode = jsonNode.get("direction");

        if (directionNode == null) {
            throw new SerializationFailedException("排序器必须包含direction属性, sort:" + jsonNode.asText());
        }

        return new Sort.Order(EnumUtils.parseEnum(Sort.Direction.class, directionNode.longValue()), propertyNode.asText());
    }
}

