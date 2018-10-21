import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.MongoClientSettings;
import com.mongodb.ConnectionString;
import com.mongodb.ServerAddress;
import com.mongodb.MongoCredential;
import com.mongodb.MongoClientOptions;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import static com.mongodb.client.model.Filters.*;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.ValidationOptions;
import java.util.Arrays;
import com.mongodb.*;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Filters;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.model.Sorts;
import java.util.Arrays;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import com.mongodb.*;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.*;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

public class HoldItIn {
	
	public static void main (String[] args) {
		HoldItIn it = new HoldItIn();
//		try {
//			MongoCredential cred = MongoCredential.createCredential("stephoknee", "heroku_r7mpww3s", "mangoes123".toCharArray());
//			MongoClient mongoClient = new MongoClient(new ServerAddress("ds237563.mlab.com", 37563), Arrays.asList(cred));
//			DB db = mongoClient.getDB("heroku_r7mpww3s");
//			DBCollection coll = db.getCollection("users");
//			System.out.println(coll.getCount());
//		
//		mongoClient.close();
//		} catch (Exception ex) {
//			ex.printStackTrace();
//		}

		
		MongoClient mongoClient = MongoClients.create("mongodb://stephoknee:mangoes123@ds237563.mlab.com:37563/heroku_r7mpww3s");
		MongoDatabase database = mongoClient.getDatabase("heroku_r7mpww3s");
		MongoCollection<Document> flightColl = database.getCollection("flight");
		MongoCollection<Document> coll = database.getCollection("user");

//		Block<Document> printBlock1 = new Block<Document>() {
//		       @Override
//		       public void apply(final Document document) {
//		           flightColl.updateOne("queue", "");
//		       }
//		};
//		flightColl.find().forEach(printBlock1);

		Block<Document> emailCheck = new Block<Document>() {
		       @Override
		       public void apply(final Document document) {
		           //System.out.println(document.toJson());
		       }
		};
		Block<Document> flightCheck = new Block<Document>() {
		       @Override
		       public void apply(final Document document) {
		           System.out.println(document.toJson());
		    	   // figure out how to check here
		       }
		};
		
		coll.find(eq("email", "gparissri@example.com")).forEach(emailCheck);
		
		// if it does exist && not already in queue, do this:	
			// generate the qr code 
			// write the email to the queue
		
		List<String> queue = new ArrayList<String>();
		queue.add("test1");
		queue.add("tags2");
		queue.add("tags3");
		BasicDBObject doc = new BasicDBObject("title", "MongoDB").append("queue", queue);
		flightColl.insertOne(doc);
//		UpdateResult result = flightColl.updateOne(eq("_id", new ObjectId("5bcb8ad9780291346ff05d3b")), push("queue1", queue));
//		flightColl.updateMany({}, unset("queue"))
//		System.out.println(result.getModifiedCount());
//		flightColl.find(eq("_id", new ObjectId("5bcb8ad9780291346ff05d3b"))).forEach(flightCheck);
//		
		// if it don't exist, tell them it don't exist try again
		
	}
}