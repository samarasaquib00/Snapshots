package exception;

public class PhotoNotFoundException extends Exception {

    public PhotoNotFoundException(String errorMessage, Throwable error) {
        super(errorMessage, error);
    }

    public PhotoNotFoundException(String errorMessage) {
        super(errorMessage);
    }

}
