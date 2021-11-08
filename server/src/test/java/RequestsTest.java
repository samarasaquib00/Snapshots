import org.junit.jupiter.api.Test;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Paths;
import java.time.Duration;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;


import static java.time.temporal.ChronoUnit.SECONDS;

public class RequestsTest {

    @Test
    void upload1() throws URISyntaxException, IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://127.0.0.1:8183/api/photoupload?uid=1"))
                .POST(HttpRequest.BodyPublishers.ofFile(
                        Paths.get("src/test/resources/d54997c3ee80fdf660031c31998bc95673e53adc9fa74086c1f92fb0884f2e10.heif")))
                .header("Content-Type", "image/heif")
                .version(HttpClient.Version.HTTP_2)
                .timeout(Duration.of(10, SECONDS))
                .build();

        HttpResponse<String> response = HttpClient.newBuilder()
                .build()
                .send(request, HttpResponse.BodyHandlers.ofString());

        assertEquals("{\"error_no\":0,\"status\":\"success\"}", response.body());

    }

    @Test
    void delete1() throws URISyntaxException, IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://127.0.0.1:8183/api/photodelete/45"))
                .DELETE()
                .version(HttpClient.Version.HTTP_2)
                .timeout(Duration.of(10, SECONDS))
                .build();

        HttpResponse<String> response = HttpClient.newBuilder()
                .build()
                .send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());

    }

    @Test
    void photoMetadataGet1() throws URISyntaxException, IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://127.0.0.1:8183/api/photometadata/28"))
                .GET()
                .version(HttpClient.Version.HTTP_2)
                .timeout(Duration.of(10, SECONDS))
                .build();

        HttpResponse<String> response = HttpClient.newBuilder()
                .build()
                .send(request, HttpResponse.BodyHandlers.ofString());

        assertEquals("{\"uploader_name\":\"evan\",\"photo_id\":28,\"is_original\":true,\"uploader\":1,\"date_uploaded\":\"2021-10-30\",\"is_public\":false,\"file_format\":\"image/jpeg\",\"hash\":\"bd7ceb08adbf82ce793f9b5067df4e55d6a9d5657c80d7b8e26230498716786c\",\"date_taken\":\"2020-03-10\"}",response.body());

    }

    @Test
    void photoEXIFAll() throws URISyntaxException, IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
                .uri(new URI("http://127.0.0.1:8183/api/photoexiflist/28"))
                .GET()
                .version(HttpClient.Version.HTTP_2)
                .timeout(Duration.of(10, SECONDS))
                .build();

        HttpResponse<String> response = HttpClient.newBuilder()
                .build()
                .send(request, HttpResponse.BodyHandlers.ofString());

        System.out.println(response.body());

        assertEquals("",response.body());

    }


}
