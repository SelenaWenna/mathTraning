<template>
	<div class="alert alert-success">
		<h3>{{ x }} {{ sign }} {{ y }} = {{ answer }} </h3>
		<hr>
		<div class="buttons">
			<button class="btn btn-success"
				v-for="number in numbers"
				@click="onAnswer(number)"
			> {{ number }} </button>
			<button class="btn btn-success"
				@click="onBackSpace"
			><</button>
			<button class="btn btn-success btn-esc"
				@click="$emit('toResultScreen')"
			>Выход</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['sign', 'level', 'settings'],
		data() {
			return defineData.call(this);
		},
		computed: {
			good() {
				switch (this.sign) {
					case '+':
						// statements_1
						return this.x + this.y;
						break;
					case '-':
						// statements_1
						return this.x - this.y;
						break;
					case '*':
						// statements_1
						return this.x * this.y;
						break;
					case ':':
						// statements_1
						return this.x / this.y;
						break;
					default:
						// statements_def
						break;
				}
			},
			numbers() {
				let res = [];

				for (var i = 1; i < 10; i++) {
					res.push(i);
				}
				res.push(0);

				return res;
			}
		},
		methods: {
			onAnswer(num) {
				if (this.answer === '?') {
					if (num !== 0 || this.good === 0) {
						this.answer = String(num);
					}
				} else {
					if (!(this.answer.length === 0 && num === 0)) {
						this.answer += String(num);
					}
				}

				if (this.answer == this.good) {
					
					let tmp = defineData.call(this);

					this.x = tmp.x;
					this.y = tmp.y;
					this.answer = tmp.answer;

					this.$emit('onNext');

				}
			},
			onBackSpace() {
				this.answer = this.answer.slice(0, this.answer.length -1);
			}
		}
	}

	function mtRand(min, max, flag) {
		let diff = max - min;
		let num = Math.floor(Math.random() * (diff + 1)) + min;

		if (flag !== false && (flag < num || num === 0)) {
			num = mtRand(min, max, flag);
		}

		return num;
	}

	function defineData() {
		let tmp = {
			answer: '?'
		};

		if (this.sign === ':') {
			tmp.y = mtRand(2, this.level + 2);
			tmp.x = tmp.y * mtRand(this.settings.min, this.settings.max);
		} else {
			tmp.x = this.sign === '*' ? mtRand(2, this.level + 2) : mtRand(this.settings.min, this.settings.max, false),

			tmp.y = mtRand(this.settings.min, this.settings.max, this.sign === '-' ? tmp.x : false);
		}

		return tmp;
	}
</script>

<style lang="scss" scoped>
	h3, .answer {
		display: inline-block;
		vertical-align: middle;
		font-size: 1.17em;
	}
</style>