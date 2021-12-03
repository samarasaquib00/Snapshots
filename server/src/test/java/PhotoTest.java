import exception.InsufficientArgumentsException;
import model.Photo;
import org.apache.commons.codec.DecoderException;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

import java.sql.Date;
import java.sql.SQLException;
import java.sql.Timestamp;

public class PhotoTest {

//    public long id;
//    public String filePath;
//    public String fileFormat; //is mime type
//    public String fileExtension;
//    public byte[] hash;
//    public int uploaderID;
//    public String uploaderName;
//    public Date dateTaken;
//    public Date dateEdited;
//    public Date dateUploaded;
//    //add gps later
//    public long lastEditor;
//    public String lastEditorName;
//    public long originalPhotoID;
//    public boolean isOriginal;
//    public boolean isPublic;

    @Test
    void photoToJSON() throws DecoderException {

        JSONObject json = new JSONObject();

        Photo photo = new Photo();
        photo.id = 923;
        json.put("photo_id", photo.id);

        //not printing file path for now
        //photo.filePath = "/Users/evanshaw/project307/photos/bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c.jpg";

        photo.fileFormat = "image/jpeg";
        json.put("file_format", photo.fileFormat);
        assertEquals("image/jpeg", json.get("file_format"));

        photo.fileExtension = "jpg";
        json.put("file_extension", photo.fileExtension);
        assertEquals("jpg", json.get("file_extension"));

        //photo.hash = Hex.decodeHex("");
        json.put("hash", "bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c");
        assertEquals("bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c", json.get("hash"));

        photo.uploaderID = 1;
        json.put("uploader_id", photo.uploaderID);
        assertEquals(1, json.get("uploader_id"));

        photo.uploaderName = "evan";
        json.put("uploader_name", photo.uploaderName);
        assertEquals( "evan", json.get("uploader_name"));

        //need to change to include time
//        photo.dateTaken = new Date(1636110845240L);
//        json.put("date_taken", photo.dateTaken);
//
//        photo.dateEdited = new Date(1636110845240L);
//        json.put("date_edited", photo.dateTaken);
//
//        photo.dateUploaded = new Date(1636110845240L);
//        json.put("date_uploaded", photo.dateTaken);

        photo.lastEditor = 2;
        json.put("last_editor_name", photo.lastEditor);
        assertEquals(2, json.get("last_editor_name"));


        photo.lastEditorName = "alex";
        json.put("last_editor_name", photo.lastEditorName);
        assertEquals("alex", json.get("last_editor_name"));


        photo.originalPhotoID = 812;
        json.put("original_photo_id", photo.originalPhotoID);
        assertEquals(812, json.get("original_photo_id"));


        photo.isOriginal = false;
        json.put("is_original", photo.isOriginal);
        assertEquals(false, json.get("is_original"));


        photo.isPublic = false;
        json.put("is_public", photo.isPublic);
        assertEquals(false, json.get("is_public"));







    }

    @Test
    void storePhotoInsufficientArgs1() throws SQLException, InsufficientArgumentsException {
        Photo photo = new Photo();

        photo.fileFormat = "image/jpeg";
        photo.fileExtension = "jpg";
        //does not have hash
        //photo.hash = Hex.decodeHex("bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c");
        photo.uploaderID = 1;
        photo.uploaderName = "evan";
        photo.dateTaken = new Timestamp(1636010845240L);

        photo.isOriginal = false;
        photo.isPublic = false;

        Exception e = assertThrows(InsufficientArgumentsException.class, () ->
                photo.store());
        assertEquals("Photo.store() requires hash generation and a file extension.", e.getMessage());
    }

    @Test
    void storePhotoInsufficientArgs2() throws SQLException, InsufficientArgumentsException, DecoderException {
        Photo photo = new Photo();

        photo.fileFormat = "image/jpeg";
        //no file extension
        //photo.fileExtension = "jpg";
        photo.hash = Hex.decodeHex("bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c");
        photo.uploaderID = 1;
        photo.uploaderName = "evan";
        photo.dateTaken = new Timestamp(1636010845240L);

        photo.isOriginal = false;
        photo.isPublic = false;

        Exception e = assertThrows(InsufficientArgumentsException.class, () ->
                photo.store());
        assertEquals("Photo.store() requires hash generation and a file extension.", e.getMessage());
    }

    @Test
    void storePhotoInsufficientArgs3() throws SQLException, InsufficientArgumentsException, DecoderException {
        Photo photo = new Photo();

        //no mime type
        //photo.fileFormat = "image/jpeg";
        photo.fileExtension = "jpg";
        photo.hash = Hex.decodeHex("bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c");
        photo.uploaderID = 1;
        photo.uploaderName = "evan";
        photo.dateTaken = new Timestamp(1636010845240L);

        photo.isOriginal = false;
        photo.isPublic = false;

        Exception e = assertThrows(InsufficientArgumentsException.class, () ->
                photo.store());
        assertEquals("Photo.store() requires file format (mime type).", e.getMessage());
    }

    @Test
    void storePhotoInsufficientArgs4() throws SQLException, InsufficientArgumentsException, DecoderException {
        Photo photo = new Photo();

        photo.fileFormat = "image/jpeg";
        photo.fileExtension = "jpg";
        photo.hash = Hex.decodeHex("bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c");
        //no uploader id
        //photo.uploaderID = 1;
        photo.uploaderName = "evan";
        photo.dateTaken = new Timestamp(1636010845240L);

        photo.isOriginal = false;
        photo.isPublic = false;

        Exception e = assertThrows(InsufficientArgumentsException.class, () ->
                photo.store());
        assertEquals("Photo.store() requires an uploader id.", e.getMessage());
    }




//    @Test
//    void storePhotoDateTakenOptional() {
//        Photo photo = new Photo();
//
//        photo.id = 923;
//        photo.filePath = "/Users/evanshaw/project307/photos/bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c.jpg";
//        photo.fileFormat = "image/jpeg";
//        photo.fileExtension = "jpg";
//        photo.hash = Hex.decodeHex("bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c");
//        photo.uploaderID = 1;
//        photo.uploaderName = "evan";
//        photo.dateTaken = new Date(1636010845240L);
//        //no set date taken
//        //photo.dateEdited = new Date(1636110845240L);
//        photo.lastEditor = 2;
//        photo.lastEditorName = "alex";
//        photo.originalPhotoID = 812;
//        photo.isOriginal = false;
//        photo.isPublic = false;
//
//
//    }






// stuff for generating more tests
//    Photo photo = new Photo();
//
//    photo.id = 923;
//    photo.filePath = "/Users/evanshaw/project307/photos/bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c.jpg";
//    photo.fileFormat = "image/jpeg";
//    photo.fileExtension = "jpg";
//    photo.hash = Hex.decodeHex("bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c");
//    photo.uploaderID = 1;
//
//
//    photo.uploaderName = "evan";
//
//    //need to change to include time
//    photo.dateTaken = new Date(1636110845240L);
//    photo.dateEdited = new Date(1636110845240L);
//    photo.dateUploaded = new Date(1636110845240L);
//    photo.lastEditor = 2;
//    photo.lastEditorName = "alex";
//    photo.originalPhotoID = 812;
//    photo.isOriginal = false;
//    photo.isPublic = false;

}
