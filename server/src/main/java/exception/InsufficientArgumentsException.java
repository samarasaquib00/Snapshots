package exception;

public class InsufficientArgumentsException extends Exception {

    public InsufficientArgumentsException(String errorMessage, Throwable error) {
        super(errorMessage, error);
    }

    public InsufficientArgumentsException(String errorMessage) {
        super(errorMessage);
    }

    public InsufficientArgumentsException() {
        super();
    }
}
