import { Router } from "express";
import {
  // Message
  MessageGetById,
  MessagePost,
  MessagePut,
  // UserMessages
  UserSentMessagesGet,
  UserReceivedMessagesGet
} from "../middleWares/Messages.middleWares";

const router = Router();

// Message
router.get('/messages/:message_id', MessageGetById);
router.put('/messages/:message_id', MessagePut);

// UserMessages
router.get('/users/:user_id/messages/sent', UserSentMessagesGet);
router.post('/users/:user_id/messages/sent', MessagePost);
router.get('/users/:user_id/messages/received', UserReceivedMessagesGet);

export default router;
