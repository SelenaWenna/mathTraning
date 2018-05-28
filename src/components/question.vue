<template>
	<div class="alert alert-success">
		<h3>{{ x }} + {{ y }} = ? </h3>
		<hr>
		<div class="buttons">
			<button class="btn btn-success"
				v-for="number in answers"
				@click="onAnswer(number)"
			> {{ number }} </button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				x: mtRand(1, 20),
				y: mtRand(1, 20)
			}
		},
		computed: {
			good() {
				return this.x+this.y;
			},
			answers() {
				let res =[this.good];

				while(res.length < 4) {
					let num = mtRand(this.good - 10, this.good + 10);

					if (res.indexOf(num) === -1) {
						res.push(num);
					}
				}

				return res.sort(function() {
					return Math.random() > .5;
				});
			}
		},
		methods: {
			onAnswer(num) {
				if (num === this.good) {
					this.$emit('onSuccess');
				} else {
					this.$emit('onError', `Ошибка! ${this.x} + ${this.y} = ${this.good}!`);
				}
			}
		}
	}

	function mtRand(min, max) {
		let diff = max - min;
		return Math.floor(Math.random() * (diff + 1)) +min;
	}
</script>

<style scoped>
	.buttons {
		display: flex;
		justify-content: space-between;
	}

	.btn {
		padding: 10px 20px;
	}
</style>