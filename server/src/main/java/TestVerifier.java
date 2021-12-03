import org.restlet.Request;
import org.restlet.Response;
import org.restlet.security.SecretVerifier;
import org.restlet.security.Verifier;

import java.io.Reader;
import java.io.UnsupportedEncodingException;
import java.sql.*;

public class TestVerifier extends SecretVerifier {


    @Override
    public int verify(String identifier, char[] secret) {
        System.out.println(secret[0]);
        String hex = String.format("%04x", (int) secret[0]);
        System.out.println(hex);
        byte[] userPasswordBytes = null;
        try {
            userPasswordBytes = new String(secret).getBytes("US-ASCII");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }



        PreparedStatement authStatement = null;
        ResultSet rs = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {

            System.out.println("is connected?: " + conn.isValid(0));


            authStatement = conn.prepareStatement("SELECT hashed_password, salt " +
                    "FROM users " +
                    "WHERE username = ? ;");


            authStatement.setString(1, identifier);


            rs = authStatement.executeQuery();

            if (rs.next()) {
                //hashed and salted password from database
                byte[] hashedPassword = rs.getBytes("hashed_password");


                byte[] salt = rs.getBytes("salt");

                byte[] secretAndSalt = new byte[hashedPassword.length + salt.length];
                for (int i = 0; i < hashedPassword.length; i++) {
                    //secretAndSalt[i] = Binarysecret[i];
                }
                for (int j = hashedPassword.length; j < hashedPassword.length + salt.length; j++) {
                    secretAndSalt[j] = salt[j];
                }

                //database referenced salted hash
                byte[] databaseSaltedHash = org.apache.commons.codec.digest.DigestUtils.sha256(secretAndSalt);



            } else {
                return -1;
            }
//uncomment this
//            if (updateCount >= 1) {
//                return 4;
//            }


            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;






    }


}
