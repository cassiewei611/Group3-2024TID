import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'HuKo8mIdhoVZSdGmhrpUrVbbAbpD2Kxfj2ce436R';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'dQXQMc0yr5pt3G8tlLqldSGPnw9pOJ3XEYL51Yq9';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export default Parse;

export const fetchAllEvents = async () => {
    try {
        const Event = Parse.Object.extend("Event");
        const query = new Parse.Query(Event);

        const results = await query.find();

        return results.map(event => ({
            id: event.id,
            title: event.get("heading"),
            description: event.get("description"),
            datetime: event.get("datetime"),
            location: event.get("location"),
            petType: event.get("petType"),
            image: event.get("image")
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

        newEvent.set("heading", eventData.heading);
        newEvent.set("description", eventData.description);
        newEvent.set("datetime", eventData.datetime);
        newEvent.set("location", eventData.location);
        newEvent.set("petType", eventData.petType);


        if (eventData.image) {
            newEvent.set("image", eventData.image);
        }

        const User = Parse.Object.extend("User");
        const userPointer = new User();
        userPointer.id = userId;
        newEvent.set("created_by", userPointer);

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

        query.equalTo("objectId", eventId);
        query.include("created_by");

        const event = await query.first();

        if (event) {
            const imageFile = event.get("image");
            const imageUrl = imageFile ? imageFile.url() : null;


            const user = event.get("created_by");
            const userId = user ? user.id : null;
            const username = user ? user.get("username") : "Unknown";


            return {
                id: event.id,
                heading: event.get("heading"),
                description: event.get("description"),
                datetime: event.get("datetime"),
                location: event.get("location"),
                petType: event.get("petType"),
                image: imageUrl,
                createdBy: { id: userId, username },
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



export const checkUserInterest = async (eventId, userId) => {
    try {
        const EventParticipation = Parse.Object.extend("EventParticipation");
        const query = new Parse.Query(EventParticipation);

        query.equalTo("event_id", {
            __type: "Pointer",
            className: "Event",
            objectId: eventId,
        });
        query.equalTo("user_id", {
            __type: "Pointer",
            className: "User",
            objectId: userId,
        });

        const existingRecord = await query.first();
        return !!existingRecord;
    } catch (error) {
        console.error("Error checking user interest:", error);
        return false;
    }
};



export const handleParticipation = async (eventId, userId) => {
    try {
        const Participant = Parse.Object.extend("Participant");
        const query = new Parse.Query(Participant);

        // 查询是否存在当前用户的参与记录
        query.equalTo("event_id", {
            __type: "Pointer",
            className: "Event",
            objectId: eventId,
        });
        query.equalTo("user_id", {
            __type: "Pointer",
            className: "User",
            objectId: userId,
        });

        const existingRecord = await query.first();

        if (existingRecord) {
            // 如果存在记录，则删除，表示取消参与
            await existingRecord.destroy();
            console.log("Participation removed successfully!");
            return false; // 返回未参与状态
        } else {
            // 如果不存在记录，则创建新记录
            const participation = new Participant();

            // 设置 event_id 和 user_id 指针
            const Event = Parse.Object.extend("Event");
            const eventPointer = new Event();
            eventPointer.id = eventId;
            participation.set("event_id", eventPointer);

            const User = Parse.Object.extend("User");
            const userPointer = new User();
            userPointer.id = userId;
            participation.set("user_id", userPointer);

            await participation.save();
            console.log("Participation recorded successfully!");
            return true; // 返回参与状态
        }
    } catch (error) {
        console.error("Error while toggling participation:", error);
        return null; // 表示操作失败
    }
};


export const fetchParticipantCount = async (eventId) => {
    try {
        const Participant = Parse.Object.extend("Participant");
        const query = new Parse.Query(Participant);

        query.equalTo("event_id", {
            __type: "Pointer",
            className: "Event",
            objectId: eventId,
        });

        const count = await query.count();
        return count;
    } catch (error) {
        console.error("Error fetching participant count:", error);
        return 0;
    }
};
