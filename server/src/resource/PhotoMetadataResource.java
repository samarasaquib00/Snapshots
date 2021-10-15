package resource;

import org.json.*;
import org.restlet.Request;
import org.restlet.data.Form;
import org.restlet.data.Parameter;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;
import java.sql.*;

public class PhotoMetadataResource extends ServerResource {

    @Get
    public String represent() {

// debug code to print out every query string
        //String id = getQueryValue("id");
//        Form form = getRequest().getResourceRef().getQueryAsForm();
//        for (Parameter parameter : form) {
//            System.out.print("parameter " + parameter.getName());
//            System.out.println("/" + parameter.getValue());
//        }

        String id = (String) getRequest().getAttributes().get("id");
        System.out.println("Requested id: " + id);

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            conn =
                    DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                            "user=root&password=NOTSECURE");
            System.out.println("connected?");

            stmt = conn.createStatement();
            // THIS IS VERY NOT SECURE
            rs = stmt.executeQuery("SELECT * FROM photos WHERE photo_id=" + id);
            int photo_id = 0;
            int uploader = 0;
            String format = null;
            String date_uploaded = null;
            if (rs.next()) {
                // gets the sql select result by the name of the column; only gets data in the first row returned
                photo_id = rs.getInt("photo_id");
                System.out.print("ID: " + photo_id);

                uploader = rs.getInt("uploader");
                System.out.print("Uploader: " + uploader);

                format = rs.getString("file_format");
                System.out.println("File Format: " + format);

                date_uploaded = rs.getString("date_uploaded");
                System.out.println("Date Uploaded: " + date_uploaded);

                //create json object then serialize to return to the user
                //this code should be replaced later because the framework has integrated representations for json
                //in JsonRepresentation. Using built in Representations should also allow other data representations
                //like XML.
                JSONObject jo = new JSONObject();
                jo.put("photo_id", photo_id);
                jo.put("uploader", uploader);
                jo.put("file_format", format);
                jo.put("date_uploaded", date_uploaded);
                return jo.toString();
            } else {
                System.out.println("data does not exist");
                return "data does not exist";
            }



        } catch (SQLException ex) {
            // handle errors
            //one possible error is nothing returned from sql; in this case it is caught by SQLException, need to
            //catch that somewhere else to add error attribute to json
            System.out.println("SQLException: " + ex.getMessage());
            System.out.println("SQLState: " + ex.getSQLState());
            System.out.println("VendorError: " + ex.getErrorCode());
        } finally {
            //closes db connection
            if (rs != null) {
                try {
                    rs.close();
                } catch (SQLException sqlEx) { } // ignore

                rs = null;
            }

            if (stmt != null) {
                try {
                    stmt.close();
                } catch (SQLException sqlEx) { } // ignore

                stmt = null;
            }
        }


        return "json";
    }

}
