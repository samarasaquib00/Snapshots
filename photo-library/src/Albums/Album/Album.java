package Albums.Album;
import java.util.ArrayList;

public class Album{
    private int length;
    private String myName;
    ArrayList<Photo> PhotoAlbum;

    private Album(){

    }
    
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
    public String removePhoto(Photo pic){
        if(this.PhotoAlbum.indexOf(pic)==-1){
            return "Photo Not Found";
        }
        else{
            this.PhotoAlbum.remove(this.PhotoAlbum.indexOf(pic));
            return "Photo Removed from Album " + this.myName;
        }
    }
    public ArrayList<Photo> getAlbum(){ //still expecting to use all the adding and removing in the class
        return PhotoAlbum;
    }
}