import exception.InsufficientArgumentsException;
import model.Photo;
import org.apache.commons.codec.binary.Hex;
import org.restlet.Request;
import org.restlet.Response;
import org.restlet.security.SecretVerifier;
import org.restlet.security.Verifier;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;

public class DatabaseVerifier extends SecretVerifier {


    @Override
    public int verify(String identifier, char[] secret) {
        PreparedStatement authStatement = null;
        ResultSet rs = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {

            System.out.println("is connected?: " + conn.isValid(0));


            authStatement = conn.prepareStatement("SELECT COUNT(*) " +
                    "FROM users " +
                    "WHERE username = ? AND " +
                    "hashed_password = ?;");


            authStatement.setString(1, identifier);
            authStatement.setCharacterStream(2, new java.io.CharArrayReader(secret));


            boolean result = authStatement.execute();
            int updateCount = authStatement.getUpdateCount();

            if (updateCount >= 1) {
                return 4;
            }


            return -1;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }



}
