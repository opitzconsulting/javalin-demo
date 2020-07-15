package com.opitzconsulting.demo.javalin;

import io.javalin.http.Context;
import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.JsonNode;
import java.io.IOException;



public final class TechnologyController {
    // TODO error handling!
    public static void getTechnology(Context context) {
        DBService con = new DBService();
        String string_id = context.pathParam("id");
        Integer id;

        if(string_id==null){
            context.status(404);
            return;
        }
        try {
            id = Integer.parseInt(string_id.trim());

        } catch (NumberFormatException nfe) {
            System.out.println("NumberFormatException: " + nfe.getMessage());
            return;
        }
        // context.json("This technology does not exist");

        Technology technology = con.getTechnology(id);
        if(technology==null){
            context.status(404);
            return;
        }
        context.status(200);
        context.json(technology);
    }


    public static void getAllTechnologies(Context context) {
        DBService test = new DBService();
        List<Technology> technologies = test.getTechnologies();
        context.json(technologies);
    }


    public static void removeTechnology(Context context) {

        DBService con = new DBService();
        String string_id = context.pathParam("id");
        Integer id;

        if(string_id==null){
            context.status(404);
            return;
        }

        try {
            id = Integer.parseInt(string_id.trim());
        } catch (NumberFormatException nfe) {
            System.out.println("NumberFormatException: " + nfe.getMessage());
            return;
        }
        con.removeTechnologies(id);
        if(id==null){
            context.status(404);
        }
        context.status(200);
        return;
    }

    // TODO context status + Error handling
    public static void insertTechnology(Context context) {
        DBService test = new DBService();
        // body as Json string
        String body = context.body();
        // read values from JSON Object:
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode techNode = mapper.readTree(body);
            String name = techNode.get("name").textValue();
            String description = techNode.get("description").textValue();
            Integer relevance = techNode.get("relevance").asInt();
            Integer recommendation = techNode.get("recommendation").asInt();
            Integer complexity = techNode.get("complexity").asInt();
            String url = techNode.get("url").textValue();
            List<String> tags =  mapper.convertValue(techNode.get("tags"), ArrayList.class);
            // Insert into database
            test.setTechnology(name, description, relevance, recommendation, complexity, url, tags);
        } catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        }  catch (IOException e) {
            e.printStackTrace();
        }

        return ;
    }
    public static void updateTechnology(Context context){
        DBService test = new DBService();
        // body as Json string
        String body = context.body();
        // read values from JSON Object:
        ObjectMapper mapper = new ObjectMapper();
        try {
            JsonNode techNode = mapper.readTree(body);
            Integer id = techNode.get("id").asInt();
            String name = techNode.get("name").textValue();
            String description = techNode.get("description").textValue();
            Integer relevance = techNode.get("relevance").asInt();
            Integer recommendation = techNode.get("recommendation").asInt();
            Integer complexity = techNode.get("complexity").asInt();
            String url = techNode.get("url").textValue();
            List<String> tags =  mapper.convertValue(techNode.get("tags"), ArrayList.class);

            // Insert into database
            test.updateTechnology(name, description, relevance, recommendation, complexity, url, tags,id);
        }
        catch (JsonGenerationException e) {
            e.printStackTrace();
        } catch (JsonMappingException e) {
            e.printStackTrace();
        }  catch (IOException e) {
            e.printStackTrace();
        }

        context.status(200);
        return;

    }



}