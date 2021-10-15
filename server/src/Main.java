import org.restlet.Component;
import org.restlet.data.Protocol;

public class Main {
    public static void main(String[] args) throws Exception {
        // Create a new Component.
        Component component = new Component();

        // Add a new HTTP server listening on port 8182.
        component.getServers().add(Protocol.HTTP, 8183);
        // Attach the application.
        component.getDefaultHost().attach("/api",
                new PhotoManagementAPIApplication());

        // Start the component.
        component.start();
    }
}
