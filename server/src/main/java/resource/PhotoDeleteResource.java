package resource;

import exception.PhotoNotFoundException;
import model.Photo;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Delete;
import org.restlet.resource.ServerResource;

import java.io.File;
import java.sql.SQLException;

public class PhotoDeleteResource extends ServerResource {

    @Delete
    public JsonRepresentation deletePhoto() {
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


        Photo photo;
        try {
            photo = Photo.retrieveByID(id);
        } catch (PhotoNotFoundException e) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 3);
            jsonError.put("error", "photo not found");
            return new JsonRepresentation(jsonError);
        } catch (SQLException e) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 4);
            jsonError.put("error", "sql error");
            return new JsonRepresentation(jsonError);
        }

        assert photo != null;
        String filePath = photo.filePath;
        File photoFile = new File(filePath);
        if (photoFile.delete()) {
            System.out.println("file deleted" + filePath);
        } else {
            System.out.println("no file was deleted");
        }


        int result;

        try {
            result = Photo.deleteByID(id);
        } catch (SQLException e) {
            e.printStackTrace();
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 4);
            jsonError.put("error", "sql error");
            return new JsonRepresentation(jsonError);
        }

        JSONObject jsonError = new JSONObject();
        jsonError.put("rows_affected", result);
        return new JsonRepresentation(jsonError);

    }

}
