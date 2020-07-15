package com.opitzconsulting.demo.javalin;

import io.javalin.Javalin;

public class TechnologyApplication {
    public static void main(String[] args) {
        Javalin app = Javalin.create(config -> {
            config.enableCorsForAllOrigins();
        }).start(7000);

        //return technology with id-or all technologies
        app.get("/technologies/:id", TechnologyController::getTechnology);
        app.get("/technologies", TechnologyController::getAllTechnologies);

        //remove technology
        app.delete("/technologies/:id",TechnologyController::removeTechnology);

        //Create a new tech
        app.post("/technologies",TechnologyController::insertTechnology);

        // Update the technology information identified by "id"
        app.put("/technologies", TechnologyController::updateTechnology);

        //returns all tags
        app.get ("/tags",TagsController::getAllTags);

        //returns tag with id
        app.get("/tags/:id", TagsController::getTag);

        //Create a new tag
        app.post("/tags",TagsController::insertTags);

    }
}
