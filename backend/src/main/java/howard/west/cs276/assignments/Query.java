package howard.west.cs276.assignments;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.RandomAccessFile;
import java.nio.channels.FileChannel;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.Scanner;
import java.util.HashMap;
import java.util.Arrays;

public class Query {

	// Term id -> position in index file
	private static Map<Integer, Long> posDict = new TreeMap<Integer, Long>();
	// Term id -> document frequency
	private static Map<Integer, Integer> freqDict = new TreeMap<Integer, Integer>();
	// Doc id -> doc name dictionary
	private static Map<Integer, String> docDict = new TreeMap<Integer, String>();
	// Term -> term id dictionary
	private static Map<String, Integer> termDict = new TreeMap<String, Integer>();
	// Index
	private static BaseIndex index = null;

	
	/* 
	 * Write a posting list with a given termID from the file 
	 * You should seek to the file position of this specific
	 * posting list and read it back.
	 * */
	private static PostingList readPosting(FileChannel fc, int termId)
			throws IOException {
		fc.position(posDict.get(termId));
		return index.readPosting(fc);
	}
	/*
	 *Returns an arraylist containing the common elements of the two arrays passed as parameters
	 * */
	private static List<Integer> findIntersection(List<Integer> arrayList1, List<Integer> arrayList2){
		List<Integer> resultArray = new ArrayList();
		for (int i = 0; i < arrayList1.size(); i++){
			if (arrayList2.contains(arrayList1.get(i))){
				resultArray.add(arrayList1.get(i));
			}
		}
		return resultArray;
	}

	public static List<List<String>> mainQuery(String input, String query) throws Exception{

	    try {

	        String[] queryTokens = query.split(" ");
                index = new BasicIndex();

		/* Get index directory */
		File inputdir = new File(input);
		if (!inputdir.exists() || !inputdir.isDirectory()) {
			System.err.println("Invalid index directory: " + input);
			return null;
		}

		/* Index file */
		RandomAccessFile indexFile = new RandomAccessFile(new File(input,
				"corpus.index"), "r");

		String line = null;
		/* Term dictionary */
		BufferedReader termReader = new BufferedReader(new FileReader(new File(
				input, "term.dict")));
		while ((line = termReader.readLine()) != null) {
			String[] tokens = line.split("\t");
			termDict.put(tokens[0], Integer.parseInt(tokens[1]));
		}
		termReader.close();

		/* Doc dictionary */
		BufferedReader docReader = new BufferedReader(new FileReader(new File(
				input, "doc.dict")));
		while ((line = docReader.readLine()) != null) {
			String[] tokens = line.split("\t");
			docDict.put(Integer.parseInt(tokens[1]), tokens[0]);
		}
		docReader.close();

		/* Posting dictionary */
		BufferedReader postReader = new BufferedReader(new FileReader(new File(
				input, "posting.dict")));
		while ((line = postReader.readLine()) != null) {
			String[] tokens = line.split("\t");
			posDict.put(Integer.parseInt(tokens[0]), Long.parseLong(tokens[1]));
			freqDict.put(Integer.parseInt(tokens[0]),
					Integer.parseInt(tokens[2]));
		}
		postReader.close();
		FileChannel indexChannel = indexFile.getChannel();

		    // Fetch all the posting lists from the index.
		    List<PostingList> postingLists = new ArrayList<PostingList>();
		    boolean noResults = false;
		    for (String queryToken : queryTokens) {
			// Get the term id for this token using the termDict map.
			Integer termId = termDict.get(queryToken);

			if (termId == null) {
				Integer term = termDict.get(queryToken.toLowerCase());
				if (term == null){
			    	noResults = true;
			    	continue;
				}else{
					postingLists.add(readPosting(indexChannel, term));
				}
			}
			else postingLists.add(readPosting(indexChannel, termId));
		    }
		    //Get the docNames that correspond to the queries
		    List<Integer> list1 = postingLists.get(0).getList();
		    List<Integer> result = new ArrayList();
		    List<String> docNames = new ArrayList();
		    List<String> minDocNames = new ArrayList();
		    if (postingLists.size() == 1){
		    	result = list1;
		    }
		    for (int i = 1; i < postingLists.size(); i++){
		    	List<Integer> list2 = postingLists.get(i).getList();
		    	result = findIntersection(list1, list2);
		    	list1 = result;
		    }
		    for (Integer item : result){
		   		docNames.add(docDict.get(item));
		    }
		    
		   //2d array that contains the search result URL and the Description
			List<List<String>> descriptionArr = new ArrayList<List<String>>();
			for (int k = 0; k < docNames.size(); k++){
				descriptionArr.add(new ArrayList<String>());
			}
			//Scan the data files to get the description
			//Description contains few words before and after the search term
			for (int i = 0; i < docNames.size(); i++){
								
				String relativeAdd = docNames.get(i);
				relativeAdd = "data/" + relativeAdd;
				File newfile = new File(relativeAdd);
				Scanner scan = new Scanner(newfile);

				int count = 0;
				String st = "";
				while (scan.hasNextLine() && (count < queryTokens.length)) {
					List<String> test = new ArrayList<String>(Arrays.asList(scan.nextLine().split(" ")));
					int ind = test.indexOf(queryTokens[count]);
					
					if (test.contains(queryTokens[count])){

				    	if ((test.size() > ind + 15) && (ind - 15 > 0)){
				    		int c = ind - 15;
				    		while (c < ind + 15){
				    			st = st+" "+test.get(c);
				    			c++;
				    		}
					     	
				        }else if ((test.size() > ind + 20)){
				        	int c = ind;
				    		while (c < ind + 20){
				    			st = st+" "+test.get(c);
				    			c++;
				    		}
						 	
					    }else if (ind - 20 > 0){
					    	int c = ind - 20;
				    		while (c <= ind ){
				    			st = st+" "+test.get(c);
				    			c++;
				    		}
						 	
					    }else if (ind - 10 > 0){
					    	int c = ind - 10;
				    		while (c <= ind ){
				    			st = st+" "+test.get(c);
				    			c++;
				    		}
					    }else if (test.size() > ind + 10){
					    	int c = ind + 10;
					    	while (c < ind + 10){
					    		st = st +" "+test.get(c);
					    	}
					    }
						count++;
					}
				}
				descriptionArr.get(i).add(docNames.get(i));
				descriptionArr.get(i).add(st);
				scan.close();
			}

		indexFile.close();
		return descriptionArr;

		} catch (Exception e) { System.out.println("ERROR " + e); }

		return null;
	}
}
