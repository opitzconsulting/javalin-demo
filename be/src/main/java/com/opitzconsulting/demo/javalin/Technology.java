package com.opitzconsulting.demo.javalin;

import java.util.List;
import java.util.ArrayList;
import java.util.Arrays;

public class Technology {
    private Integer id;
    private  String name;
    private String description;
    private Integer relevance ;
    private Integer recommendation ;
    private Integer complexity;
    private String url;
    private List<String> tags;

    public Technology(String name, String description, Integer recommendation, Integer relevance, Integer complexity, String url, List<String> tags){
        this.name = name;
        this.description = description;
        this.recommendation = recommendation;
        this.relevance = relevance;
        this.complexity = complexity;
        this.url = url;
        this.tags = tags;
    }

    public Technology(Integer id, String nameOfTechnology, String description, Integer recommendation, Integer relevance, Integer complexity, String url, List<String> tags) {
        this.id = id;
        this.name = nameOfTechnology;
        this.description = description;
        this.recommendation = recommendation;
        this.relevance = relevance;
        this.complexity = complexity;
        this.url = url;
        this.tags = tags;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public  String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(Integer recommendation) {
        this.recommendation = recommendation;
    }

    public Integer getRelevance() {
        return relevance;
    }

    public void setRelevance(Integer relevance) {
        this.relevance = relevance;
    }

    public Integer getComplexity() {
        return complexity;
    }

    public void setComplexity(Integer complexity) {
        this.complexity = complexity;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }



}

