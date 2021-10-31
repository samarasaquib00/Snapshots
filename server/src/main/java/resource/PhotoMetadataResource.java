package resource;

import exception.PhotoNotFoundException;
import model.Photo;
import org.json.*;
import org.restlet.Request;
import org.restlet.data.Form;
import org.restlet.data.Parameter;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Get;
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

}
