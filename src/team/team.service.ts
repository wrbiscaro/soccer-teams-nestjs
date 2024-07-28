import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import 'dotenv/config';
import { dynamoDBClient } from '../config/aws/dynamoDBClient';
import { CreateTeamDto, UpdateTeamDto } from './team.dto';

const { TABLE_NAME } = process.env;

@Injectable()
export class TeamService {
    async create(createTeamDto: CreateTeamDto) {
        return await dynamoDBClient()
            .put({
                TableName: TABLE_NAME,
                Item: {
                    id: uuid(),
                    name: createTeamDto.name,
                    country: createTeamDto.country,
                    founded: createTeamDto.founded,
                },
            })
            .promise();
    }

    async findAll() {
        const results = await dynamoDBClient()
            .scan({
                TableName: TABLE_NAME,
            })
            .promise();

        return results.Items;
    }

    async findOne(id: string) {
        const result = await dynamoDBClient()
            .get({
                TableName: TABLE_NAME,
                Key: { id },
            })
            .promise();

        return result.Item;
    }

    async update(id: string, updateTeamDto: UpdateTeamDto) {
        const updated = await dynamoDBClient()
            .update({
                TableName: TABLE_NAME,
                Key: { id },
                UpdateExpression:
                    'set #name = :name, country = :country, founded = :founded',
                ExpressionAttributeNames: {
                    '#name': 'name',
                },
                ExpressionAttributeValues: {
                    ':name': updateTeamDto.name,
                    ':country': updateTeamDto.country,
                    ':founded': updateTeamDto.founded,
                },
                ReturnValues: 'ALL_NEW',
            })
            .promise();

        return updated.Attributes;
    }

    async remove(id: string) {
        return await dynamoDBClient()
            .delete({
                TableName: TABLE_NAME,
                Key: { id },
            })
            .promise();
    }
}