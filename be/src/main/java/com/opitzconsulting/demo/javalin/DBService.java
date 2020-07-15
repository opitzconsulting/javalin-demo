package com.opitzconsulting.demo.javalin;

import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.logging.Logger;



public class DBService {
    private static final Logger log = Logger.getLogger(DBService.class.getName());


    private Connection conn;

    public DBService() {
        try {
            conn = initConnection();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public Technology getTechnology(Integer id) {
        Statement statement = null;
        ResultSet rs = null;
        String query = "SELECT * FROM public.technologies WHERE id =?";
        try {
            PreparedStatement preparedStatement = conn.prepareStatement(query);
            preparedStatement.setInt(1, id);
            rs = preparedStatement.executeQuery();
            Technology technology = null;
            log.info("Ich habs geschafft, ich bin ein bischen");

            while (rs.next()) {
                Integer techId = rs.getInt("id");
                String name_of_technology = rs.getString("name");
                String description_of_technology = rs.getString("description");
                Integer recommendation = rs.getInt("recommendation");
                Integer relevance = rs.getInt("relevance");
                Integer complexity = rs.getInt("complexity");
                ;
                String url = rs.getString("url");
                String tag_column = rs.getString("tags");
                String[] tags = tag_column.split(",");
                List<String> tags_list = Arrays.asList(tags);
                technology = new Technology(techId, name_of_technology, description_of_technology,
                        recommendation, relevance, complexity, url, tags_list);
            }

            return technology;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    }


    public List<Technology> getTechnologies() {
        Statement statement = null;
        ResultSet rs = null;
        try {
            statement = conn.createStatement();
            rs = statement.executeQuery("SELECT * FROM public.technologies");
            List<Technology> technologies = new ArrayList<>();

            while (rs.next()) {
                Integer Id = rs.getInt("id");
                String name = rs.getString("name");
                String description = rs.getString("description");
                Integer recommendation = rs.getInt("recommendation");
                Integer relevance = rs.getInt("relevance");
                Integer complexity = rs.getInt("complexity");
                ;
                String url = rs.getString("url");
                String tag_column = rs.getString("tags");
                String[] tags = tag_column.split(",");
                List<String> tags_list = Arrays.asList(tags);

                Technology technology = new Technology(Id, name, description, recommendation, relevance, complexity, url, tags_list);
                technologies.add(technology);
            }

            return technologies;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                
                if (statement != null) {
                    statement.close();
                }

            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    }

    public void removeTechnologies(Integer id) {
        Statement statement = null;
        ResultSet rs = null;
        String query = "DELETE FROM public.technologies WHERE id =?";
        try {
            PreparedStatement preparedStatement = conn.prepareStatement(query);
            preparedStatement.setInt(1, id);
            rs = preparedStatement.executeQuery();
            Technology technology = null;

            log.info("Ich habs geschafft");


        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }

    //set methode
    public void setTechnology(String name, String description, Integer recommendation, Integer relevance, Integer complexity, String url, List<String> tags) {
        Statement statement = null;
        ResultSet rs = null;
        String query = "INSERT INTO public.technologies (name, description, recommendation, relevance, complexity, url, tags) VALUES " +
                "( ?, ?, ?, ?, ?, ?, ?)";

        try {
            System.out.println("hier");
            PreparedStatement preparedStatement = conn.prepareStatement(query);
            preparedStatement.setString(1, name);
            preparedStatement.setString(2, description);
            preparedStatement.setInt(3 , recommendation);
            preparedStatement.setInt(4, relevance);
            preparedStatement.setInt(5,  complexity);
            preparedStatement.setString(6, url);
            String insertTags = "";
            for (String tag : tags) {
                insertTags += tag + ",";
                System.out.println(tag);
            }
            System.out.println(insertTags);
            preparedStatement.setString(7, insertTags);
            // TODO error handling
            preparedStatement.executeQuery();

        }catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
               
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }
    public void updateTechnology( String name, String description, Integer relevance, Integer recommendation, Integer complexity, String url, List<String> tags,Integer id) {
        Statement statement = null;
        ResultSet rs = null;
        
        String query = "UPDATE public.technologies SET  name=?, description=?, recommendation=?, relevance=?, complexity=?, url=?, tags=? WHERE id=?;";

        try {
            System.out.println("hier");
            PreparedStatement preparedStatement = conn.prepareStatement(query);

            preparedStatement.setString(1, name);
            preparedStatement.setString(2, description);
            preparedStatement.setInt(3, recommendation);
            preparedStatement.setInt(4, relevance);
            preparedStatement.setInt(5,  complexity);
            preparedStatement.setString(6, url);
            String insertTags = "";
            for (String tag : tags) {
                insertTags += tag + ",";
                System.out.println(tag);
            }
            System.out.println(insertTags);
            preparedStatement.setString(7, insertTags);
            preparedStatement.setInt(8, id);

            preparedStatement.executeUpdate();

        }catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

    }

 
    public Tags getSpecialTag(Integer id) {
        Statement statement = null;
        ResultSet rs = null;
        String query = "SELECT * FROM public.tags WHERE id =?";
        try {
            PreparedStatement preparedStatement = conn.prepareStatement(query);
            preparedStatement.setInt(1, id);
            rs = preparedStatement.executeQuery();
            Tags tag = null;
            log.info("Ich habs geschafft, ich bin ein bischen");

            while (rs.next()) {
                Integer tagId = rs.getInt("id");
                String tag1 = rs.getString("tag");

                tag = new Tags(tagId,tag1);
            }

            return tag;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    }
    public void insertTags(String tag) {
        Statement statement = null;
        ResultSet rs = null;
        String query = "INSERT INTO tags (tag) VALUES " +
                "( ?)";
        try {
            System.out.println("we are here : inserted new tag");
            PreparedStatement preparedStatement = conn.prepareStatement(query);
            preparedStatement.setString(1, tag);
            
            preparedStatement.execute();
        }

        catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                
                if (statement != null) {
                    statement.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    public List<Tags> getAllTags() {
        Statement statement = null;
        ResultSet rs = null;
        try {
            statement = conn.createStatement();
            rs = statement.executeQuery("SELECT * FROM public.tags");
            List<Tags> tags = new ArrayList<>();

            while (rs.next()) {
                Integer tagId = rs.getInt("id");
                String tags2 = rs.getString("tag");
                Tags tag= new Tags(tagId,tags2);
                tags.add(tag);
            }

            return tags;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                
                if (statement != null) {
                    statement.close();
                }

            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return null;
    } 

    private Connection initConnection() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");

        String user = "postgres";

        String password = "kineKine41!";

        String dbUrl = System.getenv("DB_URL");
        String dbPort = System.getenv("DB_PORT");
        String dbConnectionString = "jdbc:postgresql://" + dbUrl + ":" + dbPort + "/postgres?ssl=false";
        return DriverManager.getConnection(dbConnectionString, user, password);
    }



}
