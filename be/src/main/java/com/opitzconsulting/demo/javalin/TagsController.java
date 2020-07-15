package com.opitzconsulting.demo.javalin;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.javalin.http.Context;
import java.io.IOException;
import java.util.List;

public final class TagsController {

    public static void getTag(Context context) {
        DBService con = new DBService();
        String string_id = context.pathParam("id");
        Integer id;
        try {
            id = Integer.parseInt(string_id.trim());

        } catch (NumberFormatException nfe) {
            System.out.println("NumberFormatException: " + nfe.getMessage());
            return;
        }

        Tags tag= con.getSpecialTag(id);
        if(tag==null){
            context.status(404);
            context.json("This tag does not exist");
            return;
        }
        context.status(200);
        context.json(tag);
    }
    public static void getAllTags(Context context) {
        DBService test = new DBService();
        List<Tags> allTags = test.getAllTags();
        context.json(allTags);
        context.status(200);

    }
    public static void insertTags(Context context) {
        DBService test = new DBService();
        // body as Json string
        String body = context.body();
        // read values from JSON Object:
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode techNode = mapper.readTree(body);
            String tag = techNode.get("tag").textValue();

            // Insert into database
            test.insertTags(tag);
        } catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        }
        return ;
    }
}
