package User;
import java.util.ArrayList;
import Albums.Photo.Photo;
import Albums.Album.Album;

public class User {
    private String username; //temporarily plaintext
    private String password; //temporarily plaintext
    private ArrayList<Photo> myPhotos;
    private ArrayList<Photo> sharedWithMe;
    private ArrayList<Album> myAlbums;

    public User(String user, String pass){
        this.username = user;
        this.password = pass;
        this.myPhotos = new ArrayList<>();
        this.sharedWithMe = new ArrayList<>();
        this.myAlbums = new ArrayList<>();
    }

    //retrieval
    public String getUsername(){
        return this.username;
    }

    public String getPassword(){
        return this.password;
    }

    public ArrayList<Photo> getPhotos(){
        return this.myPhotos;
    }

    public ArrayList<Photo> getSharedPhotos(){
        return this.sharedWithMe;
    }

    public ArrayList<Album> getAlbums(){
        return this.myAlbums;
    }


    //photo management
    public boolean addPhoto(Photo pic){
        myPhotos.add(pic);
        return true;//success
    }

    public boolean removePhoto(Photo pic){
        if(myPhotos.indexOf(pic)==-1){
            return false;//failure
        }
        else{
            myPhotos.remove(myPhotos.indexOf(pic));
            return true; //success
        }
    }

    public boolean createAlbum(String str){
        myAlbums.add(new Album(str));
        return true;
    }

    public boolean removeAlbum(Album a){
        if(myAlbums.indexOf(a)==-1){
            return false;//failure
        }
        else{
            myAlbums.remove(myAlbums.indexOf(a));
            return true; //success
        }
    }

    public boolean addPhotoToAlbum(Album a, Photo p){
        a.addPhoto(p);
        return true;
    }

    public boolean removePhotoFromAlbum(Album a, Photo p){
        if(myAlbums.indexOf(a)==-1){
            return false;//failure
        }
        else{
            return a.removePhoto(p);
        }
    }
}
