package exception;

public class AlbumNotFoundException extends Exception {

    public AlbumNotFoundException(String errorMessage, Throwable error) {
        super(errorMessage, error);
    }

    public AlbumNotFoundException(String errorMessage) {
        super(errorMessage);
    }

}
