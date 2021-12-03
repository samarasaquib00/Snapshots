package resource;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.drew.metadata.file.FileTypeDirectory;
import exception.InsufficientArgumentsException;
import model.Photo;
import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.restlet.data.MediaType;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.FileRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Post;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.*;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.Arrays;
import java.util.Date;

public class PhotoUploadResource extends ServerResource {

    //upload functionality should respond to POST request with the file
    @Post
    public Representation acceptRepresentation(Representation entity) throws ResourceException {
        if (entity.getMediaType().isCompatible(MediaType.IMAGE_ALL)) {
            System.out.println("Content type field is a photo");

            byte[] rawImageFile;
            try {
                //fine for now, but need to limit the number of bytes for security
                rawImageFile = entity.getStream().readAllBytes();
            } catch (IOException e) {
                System.out.println("Error reading from stream");
                return null;
            }

            Metadata metadata;
            try {
                metadata = ImageMetadataReader.readMetadata(new ByteArrayInputStream(rawImageFile));
            } catch (ImageProcessingException e) {
                System.out.println("Image format not recognized");
                return null;
            } catch (IOException e) {
                System.out.println("Could not correctly read file");
                return null;
            }

            //add new photo
            Photo photo = new Photo();

            //hash
            photo.hash = org.apache.commons.codec.digest.DigestUtils.sha256(rawImageFile);

            //date_taken
            ExifSubIFDDirectory directory = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
            Date dateTaken = null;
            if (directory != null) {
                dateTaken = directory.getDate(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL);
                if (dateTaken != null) {
                    System.out.println("dateTaken: " + dateTaken);
                    photo.dateTaken = new java.sql.Timestamp(dateTaken.getTime());
                }
            }

            FileTypeDirectory fileDir = metadata.getFirstDirectoryOfType(FileTypeDirectory.class);
            if (fileDir != null) {
                //mime type
                String mimeType = fileDir.getString(FileTypeDirectory.TAG_DETECTED_FILE_MIME_TYPE);
                if (mimeType != null) {
                    System.out.println("Mime Type: " + mimeType);
                    //change this variable name?
                    photo.fileFormat = mimeType;
                }
                //file extension
                String fex = fileDir.getString(FileTypeDirectory.TAG_EXPECTED_FILE_NAME_EXTENSION);
                if (fex != null) {
                    System.out.println("File Extension: " + fex);
                    photo.fileExtension = fex;
                }
            }

            //uploader id
            String stringID = getQueryValue("uid");
            int id;
            try {
                id = Integer.parseInt(stringID);
                System.out.println("uid: " + id);
                photo.uploaderID = id;
            } catch (NumberFormatException e) {
                System.out.println("bad uid");
                return new JsonRepresentation("{\"error_no\":8,\"error\":\"bad uid formatting\"}");
            }

            boolean storeResult = false;
            try {
                storeResult = photo.store();
            } catch (SQLIntegrityConstraintViolationException e) {
                if (e.getErrorCode() == 1062) {
                    System.out.println("Photo has a duplicate hash");
                    return new JsonRepresentation("{\"error_no\":9," +
                            "\"error\":\"duplicate: an identical photo is already in the database\"}");
                }
            } catch (SQLException e) {
                e.printStackTrace();
                System.out.println("SQL error");
            } catch (InsufficientArgumentsException e) {
                e.printStackTrace();
                System.out.println("Slap some more arguments on");
            }
            System.out.println(storeResult);
            if (storeResult) {
                //write to file
                File outputFile = new File(photo.filePath);
                try (FileOutputStream outputStream = new FileOutputStream(outputFile)) {
                    outputStream.write(rawImageFile);
                } catch (IOException e) {
                    e.printStackTrace();
                }
                System.out.println("Done writing");
                return new JsonRepresentation("{\"error_no\":0,\"status\":\"success\"}");
            }

        } else {
            System.out.println("content type is not a photo");
            return new JsonRepresentation("{\"error_no\":6,\"error\":\"content is not an image\"}");
        }


        //this returns if the store was unsuccessful for some reason but no json was explicitly returned
        return new JsonRepresentation("{\"error_no\":7,\"error\":\"generic failure\"}");
    }

}
