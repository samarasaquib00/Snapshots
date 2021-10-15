package resource;

import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.representation.FileRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import java.io.File;
import java.sql.*;

public class PhotoResource extends ServerResource {

    @Get
    public FileRepresentation represent() {
        String id = (String) getRequest().getAttributes().get("id");
        System.out.println("Requested photo id: " + id);

        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        try {
            //The connection code should be encapsulated in the JDBC framework extension later
            conn =
                    DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                            "user=root&password=NOTSECURE");
            System.out.println("connected?");

            stmt = conn.createStatement();
            // THIS IS VERY NOT SECURE; HILARIOUSLY VULNERABLE TO SQL INJECTION
            rs = stmt.executeQuery("SELECT file_path FROM photos WHERE photo_id=" + id);

            String file_path = null;
            if (rs.next()) {
                // gets the sql select result by the name of the column; only gets data in the first row returned

                file_path = rs.getString("file_path");
                System.out.println("File Path to retrieve from: " + file_path);

                File fileToUpload = new File(file_path);
                //the image type should change depending on the file
                return new FileRepresentation(fileToUpload, MediaType.IMAGE_PNG);
            } else {
                System.out.println("data does not exist");
                return null;
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

        return null;
    }

}