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

//        return new StringRepresentation(allEXIF);

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




        for (int i = 0; i < exifTagTypes.length; i++) {
            System.out.println();
        }


        ExifSubIFDDirectory directorySubIFD = metadata.getFirstDirectoryOfType(ExifSubIFDDirectory.class);
        if (directorySubIFD != null) {
//            String imageWidth = directorySubIFD.getString(ExifSubIFDDirectory.TAG_EXIF_IMAGE_WIDTH);

//            if (imageWidth != null) {
//                exifString = exifString + directorySubIFD. + " - " + imageWidth + "\n";
//            }


            for (int i = 0; i < exifTagTypes.length; i++) {
                exifJSON.put(directorySubIFD.getTagName(exifTagTypes[i]), directorySubIFD.getString(exifTagTypes[i]));
            }


//            exifJSON.append("results", );
//            String imageHeigth = directorySubIFD.getString(ExifSubIFDDirectory.TAG_EXIF_IMAGE_HEIGHT);
//            String dateTime = directorySubIFD.getString(ExifSubIFDDirectory.TAG_DATETIME);
//            String dateTimeDigitized = directorySubIFD.getString(ExifSubIFDDirectory.TAG_DATETIME_DIGITIZED);
//            String dateTimeOriginal = directorySubIFD.getString(ExifSubIFDDirectory.TAG_DATETIME_ORIGINAL);
//            String exposureTime = directorySubIFD.getString(ExifSubIFDDirectory.TAG_EXPOSURE_TIME);
//            String fNumber = directorySubIFD.getString(ExifSubIFDDirectory.TAG_FNUMBER);
//            String focalLength = directorySubIFD.getString(ExifSubIFDDirectory.TAG_FOCAL_LENGTH);
//            String exposureBias = directorySubIFD.getString(ExifSubIFDDirectory.TAG_EXPOSURE_BIAS);
//            String isoSpeed = directorySubIFD.getString(ExifSubIFDDirectory.TAG_ISO_SPEED);
//            String flash = directorySubIFD.getString(ExifSubIFDDirectory.TAG_FLASH);
//            String orientation = directorySubIFD.getString(ExifSubIFDDirectory.TAG_ORIENTATION);
//            String make = directorySubIFD.getString(ExifSubIFDDirectory.TAG_MAKE);
//            String model = directorySubIFD.getString(ExifSubIFDDirectory.TAG_MODEL);
//            //String lens = directorySubIFD.getString(ExifSubIFDDirectory.TAG_LENS);
        }
//        GpsDirectory gpsDirectory = metadata.getFirstDirectoryOfType(GpsDirectory.class);
//
//        if (gpsDirectory != null) {
//            String latitude = gpsDirectory.getString(GpsDirectory.TAG_LATITUDE);
//            String longitude = gpsDirectory.getString(GpsDirectory.TAG_LONGITUDE);
//            String altitude = gpsDirectory.getString(GpsDirectory.TAG_ALTITUDE);
//
//        }

        System.out.println(exifJSON.toString());

        return null;

    }
}
