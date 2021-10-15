package resource;

import org.restlet.data.MediaType;
import org.restlet.representation.FileRepresentation;
import org.restlet.representation.Representation;
import org.restlet.resource.Post;
import org.restlet.resource.ResourceException;
import org.restlet.resource.ServerResource;

public class PhotoUploadResource extends ServerResource {

    //upload functionality should respond to POST request with the file
    @Post
    public Representation acceptRepresentation(Representation entity) throws ResourceException {
        if (entity.getMediaType().isCompatible(MediaType.IMAGE_ALL)) {

        }
        //should return response json
        return null;
    }

}
