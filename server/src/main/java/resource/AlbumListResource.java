package resource;

import model.Album;
import model.Photo;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import java.sql.SQLException;
import java.util.List;

public class AlbumListResource extends ServerResource {

    @Get
    public JsonRepresentation getAlbumList() {


        List<Album> albumList = null;
        try {
            albumList = Album.retrieveListAll();
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Generic SQL error");
            return new JsonRepresentation("{\"error_no\":15,\"error\":\"generic sql error\"}");
        }

        JSONObject json = new JSONObject();

        for (Album a: albumList) {
            //System.out.println(p.toJSON().toString());
            json.append("result", a.toJSON());
        }

        return new JsonRepresentation(json);
    }

}
