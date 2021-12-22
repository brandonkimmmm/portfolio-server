import { Entity, JsonType, PrimaryKey, Property, wrap } from '@mikro-orm/core';
import * as bcrypt from 'bcrypt';

export interface UserLinks {
	github?: string;
	linkedin?: string;
	resume?: string;
}

@Entity({
	tableName: 'Users'
})
export class User {
	@PrimaryKey({ hidden: true })
	id!: number;

	@Property()
	email!: string;

	@Property({ hidden: true })
	password!: string;

	@Property()
	first_name!: string;

	@Property()
	last_name!: string;

	@Property()
	tagline!: string;

	@Property()
	description!: string;

	@Property()
	avatar_url!: string;

	@Property({ type: JsonType })
	link_urls: UserLinks = {};

	@Property({ hidden: true })
	created_at: Date = new Date();

	@Property({ hidden: true })
	updated_at: Date = new Date();

	constructor(
		email: string,
		password: string,
		first_name: string,
		last_name: string,
		tagline: string,
		description: string,
		link_urls?: UserLinks
	) {
		this.email = email;
		this.password = password;
		this.first_name = first_name;
		this.last_name = last_name;
		this.tagline = tagline;
		this.description = description;
		this.link_urls = link_urls;
	}

	async validatePassword(password): Promise<boolean> {
		return bcrypt.compare(password, this.password);
	}

	toJSON() {
		const o = wrap(this).toObject();
		o.full_name = `${o.first_name} ${o.last_name}`;
		return o;
	}
}
