import org.restlet.Application;
import org.restlet.Restlet;
import org.restlet.data.ChallengeScheme;
import org.restlet.ext.crypto.DigestAuthenticator;
import org.restlet.ext.crypto.DigestVerifier;
import org.restlet.routing.Router;
import org.restlet.security.ChallengeAuthenticator;
import org.restlet.security.MapVerifier;
import org.restlet.service.CorsService;
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

        // Defines routes; each route needs a Resource class to server the route
        router.attach("/photo/{id}", PhotoResource.class);
        router.attach("/photometadata/{id}", PhotoMetadataResource.class);
        router.attach("/photoupload", PhotoUploadResource.class);
        router.attach("/photometadatalist", PhotoMetadataListResource.class);
        router.attach("/photodelete/{id}", PhotoDeleteResource.class);
        router.attach("/photoexiflist/{id}", PhotoEXIFListResource.class);
        router.attach("/album/{id}", AlbumResource.class);
        router.attach("/album", AlbumResource.class);
        router.attach("/albumlist", AlbumListResource.class);
        router.attach("/tempfavoriteupdate/{id}", PhotoMetadataTempResource.class);
        router.attach("/albumphoto", AlbumPhotoResource.class);


        ChallengeAuthenticator authenticator = new ChallengeAuthenticator(getContext(), ChallengeScheme.HTTP_BASIC, "My Realm");

        MapVerifier verifier = new MapVerifier();
        verifier.getLocalSecrets().put("username", "password".toCharArray());

        //TestVerifier is the custom database verifier, replace with DatabaseVerifier class later
        //TestVerifier verifier = new TestVerifier();

        authenticator.setVerifier(verifier);
        authenticator.setNext(router);
        return authenticator;


//        Digest Stuff
//        DigestAuthenticator authenticator = new DigestAuthenticator(getContext(), "My Realm", "My Server Key");
//
//        MapVerifier verifier = new FakeMapVerifier();
//        verifier.getLocalSecrets().put("username", "password".toCharArray());
//        authenticator.setWrappedVerifier(verifier);
//
//        authenticator.setNext(router);
//        return authenticator;



        //return router;
    }

}