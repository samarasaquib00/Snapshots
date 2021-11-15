import org.restlet.Application;
import org.restlet.Component;
import org.restlet.data.Protocol;
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
        corsService.setAllowedOrigins(new HashSet(Arrays.asList("*")));
        corsService.setAllowedCredentials(true);
        application.getServices().add(corsService);
        component.getDefaultHost().attach("/api",
                new PhotoManagementAPIApplication());
        // Start the component.
        component.start();
    }
}