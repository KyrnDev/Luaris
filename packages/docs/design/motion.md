<script setup lang="ts">
	import LxFlex from '../../ui/src/components/flex/LxFlex.vue';

	const motion = {
		duration: [
			{
				name: 'fast',
				value: '120ms',
				description: 'Use for small UI feedback such as hover, focus, toggle movement, and subtle colour transitions.',
			},
			{
				name: 'normal',
				value: '180ms',
				description: 'Use for standard component state changes where the motion should feel noticeable but still responsive.',
			},
			{
				name: 'slow',
				value: '260ms',
				description: 'Use for larger visual changes, more expressive entrances, or transitions with more distance to travel.',
			},
		],
		easing: [
			{
				name: 'standard',
				value: 'cubic-bezier(0.2, 0, 0, 1)',
				description: 'The default easing for most interface motion. It starts quickly and settles cleanly without feeling theatrical.',
			},
			{
				name: 'emphasised',
				value: 'cubic-bezier(0.2, 0, 0, 1.2)',
				description: 'A more expressive curve for moments that should feel slightly more energetic or deliberate.',
			},
		],
	};
</script>

<style scoped lang="scss">
	.motion-card {
		width: 100%;
		padding: 1rem;
		border-radius: 0.5rem;
		background: var(--lx-colour-surface-raised);
		border: 1px solid var(--lx-colour-surface-border);
	}

	.motion-demo {
		position: relative;
		width: 100%;
		height: 3.5rem;
		border-radius: 0.5rem;
		background: var(--lx-colour-surface-sunken);
		overflow: hidden;
	}

	.motion-demo__dot {
		position: absolute;
		top: 50%;
		left: 0.75rem;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 9999px;
		background: var(--lx-colour-primary);
		transform: translate(0, -50%);
	}

	@keyframes motion-demo-slide-fast {
		0% {
			transform: translate(0, -50%);
		}

		18.75% {
			transform: translate(8rem, -50%);
		}

		37.5% {
			transform: translate(8rem, -50%);
		}

		56.25% {
			transform: translate(0, -50%);
		}

		100% {
			transform: translate(0, -50%);
		}
	}

	.motion-demo__dot--fast {
		animation: motion-demo-slide-fast calc(var(--lx-motion-duration-slow) * 8) var(--lx-motion-easing-standard) infinite;
	}

	@keyframes motion-demo-slide-normal {
		0% {
			transform: translate(0, -50%);
		}

		28.125% {
			transform: translate(8rem, -50%);
		}

		37.5% {
			transform: translate(8rem, -50%);
		}

		65.625% {
			transform: translate(0, -50%);
		}

		100% {
			transform: translate(0, -50%);
		}
	}

	.motion-demo__dot--normal {
		animation: motion-demo-slide-normal calc(var(--lx-motion-duration-slow) * 8) var(--lx-motion-easing-standard) infinite;
	}

	@keyframes motion-demo-slide-slow {
		0% {
			transform: translate(0, -50%);
		}

		37.5% {
			transform: translate(8rem, -50%);
		}

		75% {
			transform: translate(0, -50%);
		}

		100% {
			transform: translate(0, -50%);
		}
	}

	.motion-demo__dot--slow {
		animation: motion-demo-slide-slow calc(var(--lx-motion-duration-slow) * 8) var(--lx-motion-easing-standard) infinite;
	}

	@keyframes motion-demo-easing-standard {
		0% {
			transform: translate(0, -50%) scale(1);
		}

		37.5% {
			transform: translate(8rem, -50%) scale(1.1);
		}

		50% {
			transform: translate(8rem, -50%) scale(1.1);
		}

		87.5% {
			transform: translate(0, -50%) scale(1);
		}

		100% {
			transform: translate(0, -50%) scale(1);
		}
	}

	.motion-demo__dot--standard {
		animation: motion-demo-easing-standard calc(var(--lx-motion-duration-slow) * 8) var(--lx-motion-easing-standard) infinite;
	}

	@keyframes motion-demo-easing-emphasised {
		0% {
			transform: translate(0, -50%) scale(1);
		}

		37.5% {
			transform: translate(8rem, -50%) scale(1.1);
		}

		50% {
			transform: translate(8rem, -50%) scale(1.1);
		}

		87.5% {
			transform: translate(0, -50%) scale(1);
		}

		100% {
			transform: translate(0, -50%) scale(1);
		}
	}

	.motion-demo__dot--emphasised {
		animation: motion-demo-easing-emphasised calc(var(--lx-motion-duration-slow) * 8) var(--lx-motion-easing-emphasised) infinite;
	}

	.motion-code {
		font-family: var(--lx-font-family-mono);
		font-size: var(--lx-font-size-sm);
		line-height: 1.4;
	}
</style>

# Motion

The Luaris Framework includes a small motion system designed for interface feedback rather than decorative animation. The goal is to make components feel responsive, clear, and intentional without slowing the user down.

[[toc]]

## Principles

The motion system is built around a few simple ideas:

- motion should reinforce state changes, not distract from them
- most transitions should feel quick and responsive
- larger or more expressive movement should be used sparingly
- a shared set of duration and easing tokens should keep interactions feeling consistent across components

In practice, this means buttons, switches, focus states, and other controls should generally animate with the same motion vocabulary.

## Duration Tokens

The framework provides three duration tokens:

<LxFlex direction="column" align="start" gap="1rem" class="lx-margin-top--2xl">
	<LxFlex v-for="duration in motion.duration" :key="duration.name" direction="column" align="start" gap="0.5rem" class="motion-card">
		<strong>{{ duration.name }} ({{ duration.value }})</strong>
		<p style="margin: 0; line-height: 1.5;">{{ duration.description }}</p>
		<div class="motion-demo">
			<div :class="`motion-demo__dot motion-demo__dot--${duration.name}`" />
		</div>
	</LxFlex>
</LxFlex>

### Guidance

- `fast` is the default for micro-feedback
- `normal` is best for standard component transitions
- `slow` should be reserved for bigger visual changes or more expressive motion

## Easing Tokens

The easing tokens define how motion accelerates and settles over time. Duration controls how long an animation takes, while easing controls how it feels.

<LxFlex direction="column" align="start" gap="1rem" class="lx-margin-top--2xl">
	<LxFlex v-for="easing in motion.easing" :key="easing.name" direction="column" align="start" gap="0.5rem" class="motion-card">
		<strong>{{ easing.name }}</strong>
		<div class="motion-code">{{ easing.value }}</div>
		<p style="margin: 0; line-height: 1.5;">{{ easing.description }}</p>
		<div class="motion-demo">
			<div :class="`motion-demo__dot motion-demo__dot--${easing.name}`" />
		</div>
	</LxFlex>
</LxFlex>

### Guidance

- `standard` should be used for most transitions
- `emphasised` works best when you want a touch more character or emphasis
- avoid mixing lots of custom curves within the same flow

## Token Reference

The current motion tokens are:

- `--lx-motion-duration-fast`: `120ms`
- `--lx-motion-duration-normal`: `180ms`
- `--lx-motion-duration-slow`: `260ms`
- `--lx-motion-easing-standard`: `cubic-bezier(0.2, 0, 0, 1)`
- `--lx-motion-easing-emphasised`: `cubic-bezier(0.2, 0, 0, 1.2)`

## Usage Patterns

Typical uses across the framework include:

- hover and focus transitions on controls
- switch thumb movement
- colour and box-shadow transitions on interactive components

Examples from the current component library already use the motion tokens for:

- button background and box-shadow transitions
- switch background and thumb movement transitions

## Recommendations

- Prefer `transition` over complex keyframe animation for standard component state changes.
- Keep interface motion short enough that the user never feels blocked waiting for it.
- Animate properties such as `transform`, `opacity`, `background-color`, and `box-shadow` where possible.
- Reserve longer or more expressive motion for larger layout changes or intentional moments of emphasis.
