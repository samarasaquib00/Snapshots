package Albums.Album;
import java.util.ArrayList;
import Albums.Photo.Photo;

public class Album{
    private int length;
    private String myName;
    ArrayList<Photo> PhotoAlbum;
    
    public Album(String str){
        this.length = 0;
        this.myName = str;
        this.PhotoAlbum = new ArrayList<>();
    }

    public int getLength(){
        return length;
    }
    public String getName(){
        return myName;
    }
    public boolean removePhoto(Photo pic){
        if(this.PhotoAlbum.indexOf(pic)==-1){
            return false;//failure
        }
        else{
            this.PhotoAlbum.remove(this.PhotoAlbum.indexOf(pic));
            return true; //success
        }
    }
    public boolean addPhoto(Photo pic){
        this.PhotoAlbum.add(pic);
        return true;
    }
    /*
    public ArrayList<Photo> getAlbum(){ //still expecting to use all the adding and removing in the class
        return PhotoAlbum;
    }
    */
}