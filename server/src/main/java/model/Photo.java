package model;

import com.drew.imaging.ImageMetadataReader;
import com.drew.metadata.Metadata;
import com.drew.metadata.MetadataReader;
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
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.time.LocalDateTime;

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
    public int lastEditor;
    public String lastEditorName;
    public int originalPhotoID;
    public boolean isOriginal;
    public boolean isPublic;

    //general method for returning sql row to object???
    public Photo() {

    }

    private static Photo resultSetRowToPhoto(ResultSet rs) throws SQLException, IOException {
        //construct photo object
        Photo photo = new Photo();
        //the function calling this one will need to rs.next() by itself
        // these cannot be null in the database. check them anyway???
        photo.id = rs.getInt("photo_id");
        photo.filePath = rs.getString("file_path");
        photo.fileFormat = rs.getString("file_format");
        photo.hash = new byte[32];
        int hash = rs.getBinaryStream("hash").readNBytes(photo.hash, 0, 32);
        photo.uploaderID = rs.getInt("uploader");
        photo.uploaderName = rs.getString("uploader_username");

//        String dateTimeString = rs.getString("date_uploaded");
//        DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//        LocalDateTime dt = LocalDateTime.parse(dateTimeString, format);


        photo.dateUploaded = rs.getDate("date_uploaded");
        photo.isPublic = rs.getBoolean("is_public");
        photo.isOriginal = rs.getBoolean("is_original");

        //these can be null when retrieving from the database
        photo.originalPhotoID = rs.getInt("original_photo");
        if (photo.originalPhotoID <= 0) {
            //can get rid of boolean field if it is 0 or points to itself?
            System.out.println("is original?");
        }

        photo.lastEditor = rs.getInt("last_editor");
        if (photo.lastEditor != 0) {
            photo.lastEditorName = rs.getString("last_editor_username");
        } else {
            photo.lastEditorName = null;
        }

        photo.dateEdited = rs.getDate("date_edited");
        if (photo.dateEdited == null) {
            System.out.println("no date_edited");
        }

        photo.dateTaken = rs.getDate("date_taken");
        if (photo.dateTaken == null) {
            System.out.println("no date_taken");
        }

        return photo;
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

            System.out.println("before");
            //now construct the object
            retrievedPhoto = new Photo();

            if (rs.next()) {
                // gets the sql select result by the name of the column; only gets data in the first row returned
                // these cannot be null in the database. check them anyway???
                retrievedPhoto.id = rs.getInt("photo_id");
                retrievedPhoto.filePath = rs.getString("file_path");
                retrievedPhoto.fileFormat = rs.getString("file_format");
                retrievedPhoto.hash = new byte[32];
                rs.getBinaryStream("hash").readNBytes(retrievedPhoto.hash, 0, 32);
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

    public static int deleteByID(int id) throws SQLException {
        PreparedStatement deleteStatement = null;
        Photo retrievedPhoto = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {
            System.out.println("is connected?: " + conn.isValid(0));

            deleteStatement = conn.prepareStatement("DELETE " +
                    "FROM photos " +
                    "WHERE photo_id = ?");

            deleteStatement.setInt(1, id);

            boolean result = deleteStatement.execute();

            return deleteStatement.getUpdateCount();
        }
    }

    public static List<Photo> retrieveListAll() throws SQLException {
        PreparedStatement photoMetadataAllStatement = null;
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
            photoMetadataAllStatement = conn.prepareStatement("SELECT " +
                    "p.*, " +
                    "u.username AS uploader_username, " +
                    "le.username AS last_editor_username " +
                    "FROM photos AS p " +
                    "LEFT JOIN users AS u ON p.uploader = u.user_id " +
                    "LEFT JOIN users AS le ON p.last_editor = le.user_id " +
                    "ORDER BY p.date_uploaded ASC;");


            rs = photoMetadataAllStatement.executeQuery();

            //now construct the object
            retrievedPhoto = new Photo();

            ArrayList<Photo> returnList = new ArrayList<Photo>();

            while (rs.next()) {
                returnList.add(resultSetRowToPhoto(rs));
            }

            return returnList;

        } catch (IOException e) {
            return null;
        }
    }
//    public static JSONObject retrieveUsefulMetadataByID(int id) throws Exception {
//
//        PreparedStatement singlePhotoFilePathStatement = null;
//        ResultSet rs = null;
//        String photoFilePath = null;
//        //try with resources
//        try (
//                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
//                        "user=root&password=NOTSECURE")) {
//            System.out.println("is connected?: " + conn.isValid(0));
//
//
//            singlePhotoFilePathStatement = conn.prepareStatement("SELECT " +
//                    "file_path" +
//                    "FROM photos " +
//                    "WHERE photo_id = ? ;");
//
//            singlePhotoFilePathStatement.setInt(1, id);
//
//            rs = singlePhotoFilePathStatement.executeQuery();
//
//            if (rs.next()) {
//                photoFilePath = rs.getString("file_path");
//            } else {
//                throw new PhotoNotFoundException("The photo with that id does not exist.");
//            }
//            rs.close();
//
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
//        if (photoFilePath != null) {
//
//        }
//        //proceed to read in file and get the tags
//        File photoFile = new File(photoFilePath);
//        Metadata metadata = ImageMetadataReader.readMetadata(photoFile);
//
//
//
//        JSONObject json = new JSONObject();
//    }

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
                    throw new InsufficientArgumentsException("Photo.store() requires hash generation and a file extension.");
                }

                if (fileFormat != null) {
                    insertStatement.setString(2, fileFormat);
                } else {
                    throw new InsufficientArgumentsException("Photo.store() requires file format (mime type).");
                }

                if (uploaderID > 0) {
                    insertStatement.setInt(4, uploaderID);
                } else {
                    throw new InsufficientArgumentsException("Photo.store() requires an uploader id.");
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

        public void update () {

        }

        public JSONObject toJSON () {
            System.out.println(0);
            JSONObject json = new JSONObject();

            //fields that must be set when retrieving from the database
            //need to check all of these for null/0
            json.put("photo_id", id);
//            System.out.println(id);

            //do not print file path, because it is unnecessary and possibly security risk
//            json.put("file_path", filePath);


//            System.out.println(filePath);
            json.put("file_format", fileFormat);
//            System.out.println(fileFormat);
            json.put("hash", Hex.encodeHexString(hash));
//            System.out.println(hash);
            json.put("uploader", uploaderID);
//            System.out.println(uploaderID);
            json.put("uploader_name", uploaderName);
//            System.out.println(uploaderName);
            json.put("date_uploaded", dateUploaded);
            System.out.println(dateUploaded);
            json.put("is_original", isOriginal);
//            System.out.println(isOriginal);
            json.put("is_public", isPublic);
//            System.out.println(isPublic);

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

        public JsonRepresentation toJSONRepresentation () {
            return new JsonRepresentation(this.toJSON());
        }

    }
