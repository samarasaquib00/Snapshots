package resource;

import exception.PhotoNotFoundException;
import model.Photo;
import org.json.*;
import org.restlet.Request;
import org.restlet.data.Form;
import org.restlet.data.Parameter;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;
import java.sql.*;

public class PhotoMetadataResource extends ServerResource {

    @Get ("json")
    public JsonRepresentation represent() {

                // debug code to print out every query string
                        //String id = getQueryValue("id");
                //        Form form = getRequest().getResourceRef().getQueryAsForm();
                //        for (Parameter parameter : form) {
                //            System.out.print("parameter " + parameter.getName());
                //            System.out.println("/" + parameter.getValue());
                //        }

        String stringID = (String) getRequest().getAttributes().get("id");
        int id;

        try {
            id = Integer.parseInt(stringID);
        } catch (NumberFormatException e) {
            System.out.println(1);
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", "1");
            jsonError.put("error", "Incorrectly formatted id");
            return new JsonRepresentation(jsonError);
        }

        if (id <= 0) {
            System.out.println(2);
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", "2");
            jsonError.put("error", "id cannot be 0 or less");
            return new JsonRepresentation(jsonError);
        }

        System.out.println("Requested id: " + id);
        Photo photo = null;
        try {
            photo = Photo.retrieveByID(id);
        } catch (PhotoNotFoundException e) {
            System.out.println(3);
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", "3");
            jsonError.put("error", "photo not found");
            return new JsonRepresentation(jsonError);
        } catch (SQLException e) {
            System.out.println(4);
            System.out.println(e.getMessage());
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", "4");
            jsonError.put("error", "some sort of strange sql error");
            e.printStackTrace();

            return new JsonRepresentation(jsonError);
        }

        JSONObject photoJSON = photo.toJSON();
        System.out.println(photoJSON.toString());
        return new JsonRepresentation(photoJSON);
    }

    @Post
    public Representation updateIsPublic() {

        String stringIsPublic = getQueryValue("is_public");
        boolean isPublic;

        if ("true".equalsIgnoreCase(stringIsPublic)) {
            System.out.println("is public: true");
            isPublic = true;
        } else if ("false".equalsIgnoreCase(stringIsPublic)) {
            System.out.println("is public: false");
            isPublic = false;
        } else {
            System.out.println("bad is_public");
            return new JsonRepresentation("{\"error_no\":16,\"error\":\"bad is_public formatting; is_public needs \"}");
        }


        String stringID = (String) getRequest().getAttributes().get("id");
        int id;

        try {
            id = Integer.parseInt(stringID);
        } catch (NumberFormatException e) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 1);
            jsonError.put("error", "Incorrectly formatted id");
            return new JsonRepresentation(jsonError);
        }
        if (id <= 0) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 2);
            jsonError.put("error", "id cannot be 0 or less");
            return new JsonRepresentation(jsonError);
        }

        int updateCount = 0;
        try {
            updateCount = Photo.updateIsPublicByID(id, isPublic);
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Generic SQL error");
            return new JsonRepresentation("{\"error_no\":15,\"error\":\"generic sql error\"}");
        }

        return new JsonRepresentation("{\"error_no\":0,\"status\":\"success\",\"update_count\":" + updateCount +  "}");
    }

}
