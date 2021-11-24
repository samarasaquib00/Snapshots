package resource;

import model.AlbumPhotoModel;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Delete;
import org.restlet.resource.Get;
import org.restlet.resource.Post;
import org.restlet.resource.ServerResource;

import java.sql.SQLException;
import java.util.List;

public class AlbumPhotoResource extends ServerResource {

    //gets a list of photos in an album by an album_id
    @Get
    public Representation getPhotoListByAlbumID() {

        String stringAlbumID = getQueryValue("album_id");
        int albumID;
        try {
            albumID = Integer.parseInt(stringAlbumID);
            System.out.println("album_id: " + albumID);
        } catch (NumberFormatException e) {
            System.out.println("bad album_id");
            return new JsonRepresentation("{\"error_no\":8,\"error\":\"bad album_id formatting\"}");
        }

        List<Integer> list = null;

        try {
            list = AlbumPhotoModel.getAlbumPhotosListByAlbumID(albumID);
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Generic SQL Exception");
            return new JsonRepresentation("{\"error_no\":7,\"error\":\"generic SQL exception\"}");
        }

        JSONObject json = new JSONObject();

        for(Integer i : list) {
            json.append("albumphotos", i);
        }

        return new JsonRepresentation(json);
    }

    //Adds a photo to an album based on the id of both
    @Post
    public Representation addPhotoToAlbum() {

        String stringAlbumID = getQueryValue("album_id");
        int albumID;
        try {
            albumID = Integer.parseInt(stringAlbumID);
            System.out.println("album_id: " + albumID);
        } catch (NumberFormatException e) {
            System.out.println("bad album_id");
            return new JsonRepresentation("{\"error_no\":8,\"error\":\"bad album_id formatting\"}");
        }

        String stringPhotoID = getQueryValue("photo_id");
        int photoID;
        try {
            photoID = Integer.parseInt(stringPhotoID);
            System.out.println("photo_id: " + photoID);
        } catch (NumberFormatException e) {
            System.out.println("bad photo_id");
            return new JsonRepresentation("{\"error_no\":8,\"error\":\"bad photo_id formatting\"}");
        }

        int updateCount = 0;

        try {
            updateCount = AlbumPhotoModel.addPhotoToAlbum(albumID, photoID);
        } catch (SQLException e) {
            //e.printStackTrace();
            System.out.println("Generic SQL Exception");
            return new JsonRepresentation("{\"error_no\":7,\"error\":\"generic SQL exception\"}");
        }

        return new JsonRepresentation("{\"error_no\":0,\"update_count\":\"" + updateCount + "\"}");
    }

    //deletes a photo from an album given the id of both
    @Delete
    public Representation removePhotoFromAlbum() {
        String stringAlbumID = getQueryValue("album_id");
        int albumID;
        try {
            albumID = Integer.parseInt(stringAlbumID);
            System.out.println("album_id: " + albumID);
        } catch (NumberFormatException e) {
            System.out.println("bad album_id");
            return new JsonRepresentation("{\"error_no\":8,\"error\":\"bad album_id formatting\"}");
        }

        String stringPhotoID = getQueryValue("photo_id");
        int photoID;
        try {
            photoID = Integer.parseInt(stringPhotoID);
            System.out.println("photo_id: " + photoID);
        } catch (NumberFormatException e) {
            System.out.println("bad photo_id");
            return new JsonRepresentation("{\"error_no\":8,\"error\":\"bad photo_id formatting\"}");
        }

        int updateCount = 0;

        try {
            updateCount = AlbumPhotoModel.removePhotoFromAlbum(albumID, photoID);
        } catch (SQLException e) {
            //e.printStackTrace();
            System.out.println("Generic SQL Exception");
            return new JsonRepresentation("{\"error_no\":7,\"error\":\"generic SQL exception\"}");
        }

        return new JsonRepresentation("{\"error_no\":0,\"update_count\":\"" + updateCount + "\"}");
    }

}
