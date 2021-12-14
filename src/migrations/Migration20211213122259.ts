import { Migration } from '@mikro-orm/migrations';
import * as bcrypt from 'bcrypt';

export class Migration20211213122259 extends Migration {
	async up(): Promise<void> {
		await this.addSql(`
			CREATE TABLE "Users" (
				id SERIAL PRIMARY KEY,
				email VARCHAR(255) NOT NULL,
				password VARCHAR(255) NOT NULL,
				first_name VARCHAR(255) NOT NULL,
				last_name VARCHAR(255) NOT NULL,
				tagline VARCHAR(255) NOT NULL,
				profile TEXT NOT NULL,
				created_at TIMESTAMP DEFAULT NOW(),
				updated_at TIMESTAMP DEFAULT NOW()
			);
		`);

		await this.addSql(`
			CREATE TABLE "Projects" (
				id SERIAL PRIMARY KEY,
				name VARCHAR(255) NOT NULL,
				description VARCHAR(255) NOT NULL,
				repo_url VARCHAR(255) NOT NULL,
				web_url VARCHAR(255),
				languages VARCHAR(255)[] NOT NULL,
				technologies VARCHAR(255)[] NOT NULL,
				last_deployed TIMESTAMP NOT NULL,
				created_at TIMESTAMP DEFAULT NOW(),
				updated_at TIMESTAMP DEFAULT NOW()
			);
		`);

		const email = process.env.ADMIN_EMAIL;
		const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
		const first_name = process.env.ADMIN_FIRST_NAME;
		const last_name = process.env.ADMIN_LAST_NAME;
		const tagline = process.env.ADMIN_TAGLINE || 'A Full-Stack Developer';
		const profile = process.env.ADMIN_PROFILE || 'I am a developer.';

		await this.addSql(`
			INSERT INTO "Users" (id, email, password, first_name, last_name, tagline, profile)
			VALUES (1, '${email}', '${password}', '${first_name}', '${last_name}', '${tagline}', '${profile}');
		`);
	}

	async down(): Promise<void> {
		await this.addSql('DROP TABLE "Projects";');
		await this.addSql('DROP TABLE "Users";');
	}
}
