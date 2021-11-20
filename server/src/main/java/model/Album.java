package model;

import exception.AlbumNotFoundException;
import exception.InsufficientArgumentsException;
import exception.PhotoNotFoundException;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Album {

    public int album_id;
    public String name;
    public int owner_id;
    //public String ownerName;
    //public Date

    public static Album retrieveByID(int id) throws SQLException, AlbumNotFoundException {
        PreparedStatement singleAlbumStatement = null;
        ResultSet rs = null;
        Album retrievedAlbum = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {
            System.out.println("is connected?: " + conn.isValid(0));

            /* query gets a single row or less from the photos table matching the id, and joins the username of the
             * uploader and the last editor in the result. this is another try with resources
             */
            singleAlbumStatement = conn.prepareStatement("SELECT " +
                    "* " +
                    "FROM albums " +
                    "WHERE album_id = ? ;");

            singleAlbumStatement.setInt(1, id);
            //result set:
            rs = singleAlbumStatement.executeQuery();

            //now construct the object
            retrievedAlbum = new Album();

            if (rs.next()) {
                // gets the sql select result by the name of the column; only gets data in the first row returned
                retrievedAlbum.album_id = rs.getInt("album_id");
                retrievedAlbum.name = rs.getString("name");
                retrievedAlbum.owner_id = rs.getInt("owner");

            } else {
                throw new AlbumNotFoundException("The photo with that id does not exist.");
            }
            rs.close();

            return retrievedAlbum;
        }
    }

    //returns update count
    public static int addAlbum(int ownerID, String name) throws SQLException, InsufficientArgumentsException {
        PreparedStatement insertStatement = null;
        ResultSet rs = null;

        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {

            System.out.println("is connected?: " + conn.isValid(0));


            insertStatement = conn.prepareStatement("INSERT INTO albums " +
                    "(name, owner, date_created, date_last_edited) " +
                    "VALUES (?, ?, NOW(), NOW());");

            if (name != null) {
                //set hash binary component of the query
                insertStatement.setString(1, name);
                System.out.println("name: " + name);
            } else {
                throw new InsufficientArgumentsException("addAlbum requires a name.");
            }

            if (ownerID > 0) {
                insertStatement.setInt(2, ownerID);
            } else {
                throw new InsufficientArgumentsException("addAlbum requires a ");
            }

            boolean result = insertStatement.execute();

            return insertStatement.getUpdateCount();
        }
    }

    public static List<Album> retrieveListAll() throws SQLException {
        PreparedStatement albumListAllStatement = null;
        ResultSet rs = null;

        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {
            System.out.println("is connected?: " + conn.isValid(0));

            albumListAllStatement = conn.prepareStatement("SELECT " +
                    "* " +
                    "FROM albums " +
                    "ORDER BY date_last_edited DESC;");


            rs = albumListAllStatement.executeQuery();

            ArrayList<Album> returnList = new ArrayList<Album>();

            while (rs.next()) {
                Album a = new Album();

                a.album_id = rs.getInt("album_id");
                a.name = rs.getString("name");
                a.owner_id = rs.getInt("owner");

                returnList.add(a);
            }

            return returnList;

        }
    }





    public JSONObject toJSON() {
        JSONObject json = new JSONObject();

        json.put("album_id", album_id);
        json.put("name", name);
        json.put("owner_id", owner_id);
        return json;
    }

}
