import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.data.ChallengeScheme;
import org.restlet.routing.Router;
import org.restlet.security.ChallengeAuthenticator;
import org.restlet.security.MapVerifier;
import org.restlet.service.CorsService;
import org.restlet.engine.application.CorsFilter;
import resource.*;

import java.util.Arrays;
import java.util.HashSet;

public class PhotoManagementAPIApplication extends Application {

    /**
     * Creates a root Restlet that will receive all incoming calls.
     */
    @Override
    public synchronized Restlet createInboundRoot() {
        // Create a router
        Router router = new Router(getContext());

        CorsFilter corsFilter = new CorsFilter(getContext(), router);
        corsFilter.setAllowedOrigins(new HashSet<String>(Arrays.asList("*")));
        corsFilter.setAllowedCredentials(true);

        // Defines routes; each route needs a Resource class to server the route
        router.attach("/photo/{id}", PhotoResource.class);
        router.attach("/photometadata/{id}", PhotoMetadataResource.class);
        router.attach("/photoupload", PhotoUploadResource.class);
        router.attach("/photometadatalist/", PhotoMetadataListResource.class);
        router.attach("/photodelete/{id}", PhotoDeleteResource.class);
        router.attach("/photoexiflist/{id}", PhotoEXIFListResource.class);

        return corsFilter;
    }

}