package resource;

import model.Photo;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import java.sql.SQLException;

public class PhotoMetadataTempResource extends ServerResource {

    @Post
    public Representation updateIsFavorite() {

        String stringIsFavorite = getQueryValue("is_favorite");
        boolean isFavorite;

        if ("true".equalsIgnoreCase(stringIsFavorite)) {
            System.out.println("is favorite: true");
            isFavorite = true;
        } else if ("false".equalsIgnoreCase(stringIsFavorite)) {
            System.out.println("is favorite: false");
            isFavorite = false;
        } else {
            System.out.println("bad is_favorite");
            return new JsonRepresentation("{\"error_no\":16,\"error\":\"bad is_favorite formatting; is_favorite needs \"}");
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
            updateCount = Photo.updateIsFavoriteByID(id, isFavorite);
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Generic SQL error");
            return new JsonRepresentation("{\"error_no\":15,\"error\":\"generic sql error\"}");
        }

        return new JsonRepresentation("{\"error_no\":0,\"status\":\"success\",\"update_count\":" + updateCount +  "}");
    }



}
