import Parse from "parse/dist/parse.min.js";

const PARSE_APPLICATION_ID = "HuKo8mIdhoVZSdGmhrpUrVbbAbpD2Kxfj2ce436R";
const PARSE_HOST_URL = "https://parseapi.back4app.com/";
const PARSE_JAVASCRIPT_KEY = "dQXQMc0yr5pt3G8tlLqldSGPnw9pOJ3XEYL51Yq9";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default Parse;

export const fetchAllEvents = async () => {
  try {
    const Event = Parse.Object.extend("Event");
    const query = new Parse.Query(Event);

    // Fetch all events
    const results = await query.find();

    // Map results to a simpler format
    return results.map((event) => ({
      id: event.id,
      title: event.get("heading"),
      description: event.get("description"),
      datetime: event.get("datetime"),
      location: event.get("location"),
      petType: event.get("petType"),
      image: event.get("image"),
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const createEvent = async (eventData, userId) => {
  try {
    const Event = Parse.Object.extend("Event");
    const newEvent = new Event();

    newEvent.set("heading", eventData.headline); // Event title
    newEvent.set("description", eventData.description); // Event description
    newEvent.set("datetime", eventData.datetime); // Event date and time
    newEvent.set("location", eventData.location); // Event location
    newEvent.set("petType", eventData.eventPetType); // Type of pet related to the event (e.g., Dog, Cat, Bird)

    // Set the image URL or file path
    newEvent.set("image", eventData.image || ""); // Optional, default to empty if not provided

    // Set the created_by field with a reference to the User
    const User = Parse.Object.extend("User");
    const userPointer = new User();
    userPointer.id = userId; // Assuming userId is passed as an argument
    newEvent.set("created_by", userPointer); // Foreign key reference

    await newEvent.save();
    console.log("Event created successfully!");
  } catch (error) {
    console.error("Error while creating event:", error);
  }
};

export const fetchEventDetails = async (eventId) => {
  try {
    const Event = Parse.Object.extend("Event");
    const query = new Parse.Query(Event);

    query.equalTo("objectId", eventId); // Search by event ID
    const event = await query.first(); // Fetch the first matching result

    if (event) {
      // Return the event details as an object
      return {
        id: event.id,
        headline: event.get("heading"), // Event title
        description: event.get("description"), // Event description
        datetime: event.get("datetime"), // Event date and time
        location: event.get("location"), // Event location
        petType: event.get("petType"), // Type of pet
        image: event.get("image"), // Image URL or path
        createdBy: event.get("created_by").id, // User ID who created the event (pointer to User)
      };
    } else {
      console.log("No event found with this ID");
      return null;
    }
  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
};

// 检查用户是否对某个事件感兴趣
export const checkUserInterest = async (eventId, userId) => {
  try {
    const EventParticipation = Parse.Object.extend("EventParticipation");
    const query = new Parse.Query(EventParticipation);

    query.equalTo("event_id", eventId);
    query.equalTo("user_id", userId);
    const existingRecord = await query.first();

    return !!existingRecord; // 返回布尔值，表示是否存在记录
  } catch (error) {
    console.error("Error checking user interest:", error);
    return false;
  }
};

// 切换感兴趣状态
export const toggleParticipation = async (eventId, userId) => {
  try {
    const EventParticipation = Parse.Object.extend("EventParticipation");
    const query = new Parse.Query(EventParticipation);

    // 查找是否已存在用户感兴趣记录
    query.equalTo("event_id", eventId);
    query.equalTo("user_id", userId);
    const existingRecord = await query.first();

    if (existingRecord) {
      // 如果记录存在，删除它表示取消感兴趣
      await existingRecord.destroy();
      return false; // 返回 `false`，表示现在是未感兴趣状态
    } else {
      // 如果记录不存在，创建新记录表示感兴趣
      const newParticipation = new EventParticipation();
      newParticipation.set("event_id", eventId);
      newParticipation.set("user_id", userId);

      await newParticipation.save();
      return true; // 返回 `true`，表示现在是感兴趣状态
    }
  } catch (error) {
    console.error("Error toggling participation:", error);
    throw error;
  }
};
