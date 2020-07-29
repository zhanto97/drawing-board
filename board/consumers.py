import json
from channels.generic.websocket import AsyncWebsocketConsumer

width = 100
height = 70
board = [['#ffffff' for i in range(width)] for j in range(height)]
class BoardConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.room_name = "board"
        self.room_group_name = "drawing_board"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()
        await self.send(text_data=json.dumps({
            'type': 'initialize_board',
            'width': width,
            'height': height,
            'board': board,
        }))

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        if text_data_json['type'] == 'fill_cell':
            board[text_data_json['y']][text_data_json['x']] = text_data_json['color']
            await self.channel_layer.group_send(
                self.room_group_name,
                text_data_json
            )

    async def fill_cell(self, event):
        await self.send(text_data=json.dumps(event))