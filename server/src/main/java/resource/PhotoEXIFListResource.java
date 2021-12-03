package resource;

import com.drew.imaging.ImageMetadataReader;
import com.drew.imaging.ImageProcessingException;
import com.drew.metadata.Directory;
import com.drew.metadata.Metadata;
import com.drew.metadata.Tag;
import com.drew.metadata.exif.ExifSubIFDDirectory;
import com.drew.metadata.exif.GpsDirectory;
import exception.PhotoNotFoundException;
import model.Photo;
import org.json.JSONObject;
import org.restlet.ext.json.JsonRepresentation;
import org.restlet.representation.Representation;
import org.restlet.representation.StringRepresentation;
import org.restlet.resource.Get;
import org.restlet.resource.ServerResource;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Date;

public class PhotoEXIFListResource extends ServerResource {

    @Get
    public Representation represent() {

        String stringID = (String) getRequest().getAttributes().get("id");
        int id;

        try {
            id = Integer.parseInt(stringID);
        } catch (NumberFormatException e) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 1);
            jsonError.put("error", "Incorrectly formatted id");
            return new JsonRepresentation(jsonError);
        }
        if (id <= 0) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 2);
            jsonError.put("error", "id cannot be 0 or less");
            return new JsonRepresentation(jsonError);
        }

        Photo photo;
        try {
            photo = Photo.retrieveByID(id);
        } catch (PhotoNotFoundException e) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 3);
            jsonError.put("error", "photo not found");
            return new JsonRepresentation(jsonError);
        } catch (SQLException e) {
            JSONObject jsonError = new JSONObject();
            jsonError.put("error_no", 4);
            jsonError.put("error", "sql error");
            return new JsonRepresentation(jsonError);
        }

        assert photo != null;
        String filePath = photo.filePath;

        File photoFile = new File(filePath);

        Metadata metadata;
        try {
            metadata = ImageMetadataReader.readMetadata(photoFile);
        } catch (ImageProcessingException e) {
            System.out.println("Image format not recognizedBADBADBADBAD");
            return null;
        } catch (IOException e) {
            System.out.println("Could not correctly read file");
            return null;
        }

        String allEXIF = new String("");

        for (Directory directory : metadata.getDirectories()) {
            for (Tag tag : directory.getTags()) {
                //System.out.println(tag.getTagTypeHex());
                allEXIF += String.format("[%s] - %s = %s\n",
                        directory.getName(), tag.getTagName(), tag.getDescription());
                System.out.println(String.format("[%s] - %s = %s\n",
                        directory.getName(), tag.getTagName(), tag.getDescription()));
            }
            if (directory.hasErrors()) {
                for (String error : directory.getErrors()) {
                    System.err.format("ERROR: %s", error);
                }
            }
        }

        JSONObject exifJSON = new JSONObject();

        int[] exifTagTypes = new int[] {
                ExifSubIFDDirectory.TAG_EXIF_IMAGE_WIDTH,
                ExifSubIFDDirectory.TAG_EXIF_IMAGE_HEIGHT,
                ExifSubIFDDirectory.TAG_DATETIME,
                ExifSubIFDDirectory.TAG_DATETIME_DIGITIZED,
                ExifSubIFDDirectory.TAG_EXPOSURE_TIME,
                ExifSubIFDDirectory.TAG_FNUMBER,
                ExifSubIFDDirectory.TAG_FOCAL_LENGTH,
                ExifSubIFDDirectory.TAG_EXPOSURE_BIAS,
                ExifSubIFDDirectory.TAG_ISO_SPEED,
                ExifSubIFDDirectory.TAG_FLASH,
                ExifSubIFDDirectory.TAG_ORIENTATION,
                ExifSubIFDDirectory.TAG_MAKE,
                ExifSubIFDDirectory.TAG_MODEL,
                ExifSubIFDDirectory.TAG_LENS
        };

        int[] gpsExifTagTypes = new int[] {
                GpsDirectory.TAG_LATITUDE,
                GpsDirectory.TAG_LONGITUDE,
                GpsDirectory.TAG_ALTITUDE
        };


        ExifSubIFDDirectory directorySubIFD = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
        if (directorySubIFD != null) {
            for (int i = 0; i < exifTagTypes.length; i++) {
                exifJSON.put(directorySubIFD.getTagName(exifTagTypes[i]), directorySubIFD.getString(exifTagTypes[i]));
            }
        }

        GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
        if (gpsDirectory != null) {
            for (int i = 0; i < gpsExifTagTypes.length; i++) {
                exifJSON.put(gpsDirectory.getTagName(gpsExifTagTypes[i]), gpsDirectory.getString(gpsExifTagTypes[i]));
            }
        }

        System.out.println(exifJSON.toString());

        return new JsonRepresentation(exifJSON);

    }
}
