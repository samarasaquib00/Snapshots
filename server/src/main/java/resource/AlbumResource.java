package resource;

import exception.AlbumNotFoundException;
import exception.InsufficientArgumentsException;
import model.Album;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import java.sql.SQLException;

public class AlbumResource extends ServerResource {

    @Get("json")
    public JsonRepresentation getAlbum() {
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
        System.out.println("Requested photo id: " + id);

        Album requestedAlbum = null;
        try {
            requestedAlbum = Album.retrieveByID(id);
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        } catch (AlbumNotFoundException e) {
            e.printStackTrace();
            return null;
        }

        JSONObject albumJson = requestedAlbum.toJSON();
        return new JsonRepresentation(albumJson);
    }

    @Post("json")
    public JsonRepresentation createAlbum() {

        Album albumToAdd = new Album();

        //uploader id
        String stringOwnerID = getQueryValue("owner");
        int ownerID;
        try {
            ownerID = Integer.parseInt(stringOwnerID);
            System.out.println("ownerid: " + ownerID);
            albumToAdd.owner_id = ownerID;
        } catch (NumberFormatException e) {
            System.out.println("bad ownerID");
            return new JsonRepresentation("{\"error_no\":8,\"error\":\"bad ownerID formatting\"}");
        }

        String name = getQueryValue("name");
        if (name == null) {
            System.out.println("needs a name");
            return new JsonRepresentation("{\"error_no\":12,\"error\":\"add album requires a name\"}");
        } else {
            albumToAdd.name = name;
        }

        int updateCount = 0;

        try {
            updateCount = Album.addAlbum(ownerID, name);
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Generic SQL exception");
        } catch (InsufficientArgumentsException e) {
            //e.printStackTrace();
            System.out.println("Insufficient arguments for add album");
        }

        if (updateCount <= 0) {
            return new JsonRepresentation("{\"error_no\":13,\"error\":\"album was not added to the database\"}");
        } else if (updateCount == 1) {
            return new JsonRepresentation("{\"error_no\":0,\"error\":\"successfully added album\"}");
        } else {
            return new JsonRepresentation("{\"error_no\":14,\"error\":\"bad; updated more than one row somehow\"}");
        }

    }

}
