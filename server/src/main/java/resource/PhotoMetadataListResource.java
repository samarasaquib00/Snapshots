package resource;

import model.Photo;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import java.sql.SQLException;
import java.util.ArrayList;

public class PhotoMetadataListResource extends ServerResource {

    @Get("json")
    public JsonRepresentation represent() {
        JSONObject json = new JSONObject();

        try {
            ArrayList<Photo> list = (ArrayList<Photo>) Photo.retrieveListAll();

            if(list != null) {
                for (Photo p: list) {
                    //System.out.println(p.toJSON().toString());
                    json.append("result", p.toJSON());
                }
                return new JsonRepresentation(json);

            } else {
                //possibly nothing found
                //handle errors by returning more json
                return null;
            }


        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("bad");
        }
        return null;
    }
}
