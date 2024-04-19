 +---------------------+         
 |Properties           |          
 +---------------------+                                   
 |PK| property_id      |---+                                           +------------+ 
 |                     |   |                                           |   Users    | 
 |---------------------|   |                                           +------------+ 
 |FK| owner_id         |*--|---------------------------------------+---| user_id    |
 |---------------------|   |                                       |   | name       | 
 | title               |   |                                       |   | email      |
 | description         |   |                                       |   | description|
 | thumbnail_photo_url |   |         +----------------+            |   | password   | 
 | parking_spaces      |   |         | Reservations   |            |   +------------+ 
 | num_of_bathrooms    |   |         |--------------- |            |                  
 | cost_per_night      |   |         | reservation_id |-------+    |                          
 | num_of_bedrooms     |   |         | start_date     |       |    |                               
 | thumbnail_url       |   |         | end_date       |       |    |        
 | cover_photo_url     |   |         | guest_id(FK)   |*------|----+            
 | street              |   +--------*| property_id(FK)|       |    |                 
 | city                |   |         +----------------+       |    |    
 | province            |   |                                  |    |
 | post_code           |   |        +-------------------+     |    |
 | is_active           |   |        | PropertyReviews|  |     |    |                         |    |
 | owner_id(FK)        |   |        +-------------------+     |    |
 +---------------------+   |        |PK| id             |     |    |
                           |        |FK| guest_id       |*----|----+                        
                           +-------*|FK| property_id    |     |                                  
                                    |    reservation_id |*----+   
                                    |    rating         |
                                    |    message        |
                                    +-------------------+
                                  
                           
                                     
                                     
                                    
                                     
                                              