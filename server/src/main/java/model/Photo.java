package model;

import exception.InsufficientArgumentsException;
import exception.PhotoNotFoundException;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.*;

public class Photo {

    //byte array ???

    public long id;
    public String filePath;
    public String fileFormat; //is mime type
    public String fileExtension;
    public byte[] hash;
    public int uploaderID;
    public String uploaderName;
    public Date dateTaken;
    public Date dateEdited;
    public Date dateUploaded;
    //add gps later
    public long lastEditor;
    public String lastEditorName;
    public long originalPhotoID;
    public boolean isOriginal;
    public boolean isPublic;

    public Photo () {

    }

    public static Photo retrieveByID(int id) throws PhotoNotFoundException, SQLException {
        PreparedStatement singlePhotoMetadataStatement = null;
        ResultSet rs = null;
        Photo retrievedPhoto = null;
        //try with resources
        try (
            Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                            "user=root&password=NOTSECURE")) {
            System.out.println("is connected?: " + conn.isValid(0));

            /* query gets a single row or less from the photos table matching the id, and joins the username of the
             * uploader and the last editor in the result. this is another try with resources
             */
            singlePhotoMetadataStatement = conn.prepareStatement("SELECT " +
                    "p.*, " +
                    "u.username AS uploader_username, " +
                    "le.username AS last_editor_username " +
                    "FROM photos AS p " +
                    "LEFT JOIN users AS u ON p.uploader = u.user_id " +
                    "LEFT JOIN users AS le ON p.last_editor = le.user_id " +
                    "WHERE p.photo_id = ? ;");

            singlePhotoMetadataStatement.setInt(1, id);
            System.out.println("before rsclose");

            rs = singlePhotoMetadataStatement.executeQuery();
            System.out.println("after rsclose");

            //now construct the object
            retrievedPhoto = new Photo();

            if (rs.next()) {
                // gets the sql select result by the name of the column; only gets data in the first row returned
                // these cannot be null in the database. check them anyway???
                retrievedPhoto.id = rs.getInt("photo_id");
                retrievedPhoto.filePath = rs.getString("file_path");
                retrievedPhoto.fileFormat = rs.getString("file_format");
                int hash = rs.getBinaryStream("hash").readNBytes(retrievedPhoto.hash, 0, 32);
                retrievedPhoto.uploaderID = rs.getInt("uploader");
                retrievedPhoto.uploaderName = rs.getString("uploader_username");
                retrievedPhoto.dateUploaded = rs.getDate("date_uploaded");
                retrievedPhoto.isPublic = rs.getBoolean("is_public");
                retrievedPhoto.isOriginal = rs.getBoolean("is_original");

                //these can be null when retrieving from the database
                retrievedPhoto.originalPhotoID = rs.getInt("original_photo");
                if (retrievedPhoto.originalPhotoID <= 0) {
                    //can get rid of boolean field if it is 0 or points to itself?
                    System.out.println("is original?");
                }

                retrievedPhoto.lastEditor = rs.getInt("last_editor");
                if (retrievedPhoto.lastEditor != 0) {
                    retrievedPhoto.lastEditorName = rs.getString("last_editor_username");
                } else {
                    retrievedPhoto.lastEditorName = null;
                }

                retrievedPhoto.dateEdited = rs.getDate("date_edited");
                if (retrievedPhoto.dateEdited == null) {
                    System.out.println("no date_edited");
                }

                retrievedPhoto.dateTaken = rs.getDate("date_taken");
                if (retrievedPhoto.dateTaken == null) {
                    System.out.println("no date_taken");
                }

            } else {
                throw new PhotoNotFoundException("The photo with that id does not exist.");
            }
            System.out.println("before rsclose");
            rs.close();

            return retrievedPhoto;

        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public boolean store() throws SQLException, InsufficientArgumentsException {

        PreparedStatement insertStatement = null;
        ResultSet rs = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {

            System.out.println("is connected?: " + conn.isValid(0));


            insertStatement = conn.prepareStatement("INSERT INTO photos " +
                    "(file_path, file_format, hash, uploader, date_taken, date_uploaded) " +
                    "VALUES (?, ?, ?, ?, ?, NOW());");

            if (hash != null && fileExtension != null) {
                //set hash binary component of the query
                insertStatement.setBinaryStream(3, new ByteArrayInputStream(hash), 32);
                //set filepath component
                filePath = "/Users/evanshaw/project307/photos/" + Hex.encodeHexString(hash) + "." + fileExtension;
                System.out.println("File Path: " + filePath);
                insertStatement.setString(1, filePath);
            } else {
                throw new InsufficientArgumentsException("store requires hash generation and file extension");
            }

            if (fileFormat != null) {
                insertStatement.setString(2, fileFormat);
            } else {
                throw new InsufficientArgumentsException("store requires file format (mime type)");
            }

            if (uploaderID > 0) {
                insertStatement.setInt(4, uploaderID);
            } else {
                throw new InsufficientArgumentsException("store requires file format (mime type)");
            }

            //optionally include date taken; do not throw exception
            if (dateTaken != null) {
                insertStatement.setDate(5, dateTaken);
            } else {
                insertStatement.setNull(5, Types.NULL);
            }

            boolean result = insertStatement.execute();
            int lol = insertStatement.getUpdateCount();
            System.out.println(lol);

            if (lol >= 1) {
                return true;
            }

            System.out.println(result);
            System.out.println("It should have worked.");

            return result;
        }
    }

    public void update() {

    }

    public JSONObject toJSON() {
        System.out.println(0);
        JSONObject json = new JSONObject();

        //fields that must be set when retrieving from the database
        //need to check all of these for null/0
        json.put("photo_id", id);
        System.out.println(id);
        json.put("file_path", filePath);
        System.out.println(filePath);
        json.put("file_format", fileFormat);
        System.out.println(fileFormat);
        json.put("hash", hash);
        System.out.println(hash);
        json.put("uploader", uploaderID);
        System.out.println(uploaderID);
        json.put("uploader_name", uploaderName);
        System.out.println(uploaderName);
        json.put("date_uploaded", dateUploaded);
        System.out.println(dateUploaded);
        json.put("is_original", isOriginal);
        System.out.println(isOriginal);
        json.put("is_public", isPublic);
        System.out.println(isPublic);

        //fields that do not have to be set when retrieving from the database
        if (dateTaken != null) {
            json.put("date_taken", dateTaken);
        }

        if (dateEdited != null) {
            json.put("date_edited", dateEdited);
        }

        if (lastEditor != 0) {
            json.put("last_editor", lastEditor);
        }

        if (lastEditorName != null) {
            json.put("last_editor_name", lastEditorName);
        }

        if (originalPhotoID != 0) {
            json.put("original_photo", originalPhotoID);
        }

        return json;
    }

    public JsonRepresentation toJSONRepresentation() {
        return new JsonRepresentation(this.toJSON());
    }

}
