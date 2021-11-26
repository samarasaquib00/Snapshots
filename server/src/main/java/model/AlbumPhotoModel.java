package model;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class AlbumPhotoModel {


    public static int addPhotoToAlbum(int albumID, int photoID) throws SQLException {
        PreparedStatement insertStatement = null;
        ResultSet rs = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {

            System.out.println("is connected?: " + conn.isValid(0));

            insertStatement = conn.prepareStatement("INSERT INTO album_photos " +
                    "(album_id, photo_id) " +
                    "VALUES (?, ?);");

            insertStatement.setInt(1, albumID);
            insertStatement.setInt(2, photoID);

            boolean result = insertStatement.execute();
            return insertStatement.getUpdateCount();
        }
    }

    public static List<Integer> getAlbumPhotosListByAlbumID(int albumID) throws SQLException {
        PreparedStatement albumPhotosStatement = null;
        ResultSet rs = null;
        Photo retrievedPhoto = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {
            System.out.println("is connected?: " + conn.isValid(0));



            albumPhotosStatement = conn.prepareStatement("SELECT photo_id " +
                    "FROM album_photos " +
                    "WHERE album_id = ?;");

            albumPhotosStatement.setInt(1, albumID);

            rs = albumPhotosStatement.executeQuery();

            ArrayList<Integer> list = new ArrayList<>();

            while (rs.next()) {
                list.add(rs.getInt("photo_id"));
            }

            return list;
        }
    }

    public static int removePhotoFromAlbum(int albumID, int photoID) throws SQLException {

        PreparedStatement removeStatement = null;
        ResultSet rs = null;
        //try with resources
        try (
                Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/photodb?" +
                        "user=root&password=NOTSECURE")) {

            System.out.println("is connected?: " + conn.isValid(0));

            removeStatement = conn.prepareStatement("DELETE FROM album_photos " +
                    "WHERE album_id = ? AND photo_id = ?;");

            removeStatement.setInt(1, albumID);
            removeStatement.setInt(2, photoID);

            boolean result = removeStatement.execute();
            return removeStatement.getUpdateCount();
        }

    }
}
