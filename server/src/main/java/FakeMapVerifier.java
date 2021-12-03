import org.restlet.security.MapVerifier;

public class FakeMapVerifier extends MapVerifier {

    @Override
    public char[] getLocalSecret(String identifier) {
        System.out.println("*** Getting Local Secret ***");
        return (identifier == null) ? null : getLocalSecrets().get(identifier);
    }

    @Override
    public int verify(String identifier, char[] secret) {
        System.out.println("*** Verifying ***");
        return compare(secret, getLocalSecret(identifier)) ? RESULT_VALID
                : RESULT_INVALID;
    }


}
