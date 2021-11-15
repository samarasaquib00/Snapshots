import org.restlet.Application;
import org.restlet.Component;
import org.restlet.data.Protocol;
import org.restlet.ext.crypto.DigestAuthenticator;
import org.restlet.ext.crypto.DigestVerifier;
import org.restlet.service.CorsService;

import java.util.Arrays;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create a new Component.
        Component component = new Component();

        // Add a new HTTP server listening on port 8183.
        component.getServers().add(Protocol.HTTP, 8183);
        // Attach the application.
        Application application = new PhotoManagementAPIApplication();

        CorsService corsService = new CorsService();
        corsService.setAllowingAllRequestedHeaders(true);
        corsService.setAllowedOrigins(new HashSet(Arrays.asList("*")));
        corsService.setAllowedCredentials(true);
        corsService.setSkippingResourceForCorsOptions(true);

        application.getServices().add(corsService);




        DigestAuthenticator guard = new DigestAuthenticator(null, "TestRealm", "mySecretServerKey");
        DigestVerifier digestVerifier = new DigestVerifier<DatabaseVerifier>("MD5", new DatabaseVerifier(), "");

        guard.setVerifier(digestVerifier);
        guard.setNext(application);

        component.getDefaultHost().attachDefault(guard);
        //resolve this attachment scheme problem  ^^ and vv
        component.getDefaultHost().attach("/api",
                application);

        // Start the component.
        component.start();
    }
}
